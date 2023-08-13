import Layout from "@/components/Layout";
import { createNewAnswer } from "@/modules/fetch/answers";
import { getAllQuestion } from "@/modules/fetch/questions";
import { createNewScore, getAllScore } from "@/modules/fetch/scores";
import {
    CircularProgress,
    Container,
    Flex,
    Heading,
    Radio,
    RadioGroup,
    Stack,
    Button,
} from "@chakra-ui/react";
import Swal from "sweetalert2"
import { useEffect, useState } from "react";
import { getLoginUser } from "@/modules/fetch/users";
import { useRouter } from "next/router";

export default function AllQuestions() {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({}); // To store user's selected answers
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [showQuiz, setShowQuiz] = useState(false);
    const router = useRouter();

    const fetchQuestions = async () => {
        const data = await getAllQuestion();
        setQuestions(data);
        setIsLoading(false);
    };

    const fetchScore = async () => {
        if (window.localStorage.getItem("token")) {
            const data = await getAllScore();
            setScore(data);
            setIsLoading(false);
        }
    }

    const fetchUser = async () => {
        if (window.localStorage.getItem("token")) {
            const data = await getLoginUser();
            setCurrentUser(data);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchScore()
        fetchQuestions();
        fetchUser()
    }, []);


    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const currentQuestion = questions[currentQuestionIndex]; // Ambil pertanyaan saat ini

    async function handleFormSubmit(event) {
        event.preventDefault();

        const selectedChoiceText = selectedAnswers[currentQuestion.id];

        const selectedChoice = currentQuestion.Choices.find(
            (choice) => choice.choice_text === selectedChoiceText
        );

        if (!selectedChoice) {
            Swal.fire({
                icon: 'warning',
                title: 'Pilihan Tidak Ditemukan',
                text: 'Silakan pilih salah satu jawaban.',
            });
            return;
        }

        const answerData = {
            question_id: currentQuestion.id,
            choice_id: selectedChoice.id,
        };

        try {
            const res = await createNewAnswer(answerData);
            console.log("Jawaban berhasil disimpan:", res);

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswers({
                    ...selectedAnswers,
                    [currentQuestion.id]: "", // Clear selected answer for the current question
                });

            } else {
                const doneScore = await createNewScore()
                console.log("Score berhasil disimpan:", doneScore);
                fetchScore()
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat menyimpan jawaban:", error);
        }
    }

    useEffect(() => {
        if (score && score.length > 0) {
            setShowQuiz(true);
        }
    }, [score]);

    if (isLoading) {
        return (
            <Flex height="full" width="full" align="center">
                <CircularProgress isIndeterminate color="green.300" />
            </Flex>
        );
    }

    return (
        <Layout>
            <Container maxW="xl" mt={8}>
                { showQuiz ? (
                    <Flex direction="column" alignItems="center">
                        {score.map((scor, idx) => (
                            <div key={idx}>
                                <Heading as="h1" mb={4}>
                                    Hasil Quiz
                                </Heading>
                                <Heading as="h2" size="lg" mb={4}>
                                    Skor Anda: {scor.score}
                                </Heading>
                            </div>
                        ))}
                    </Flex>
                ) : (
                    <div>
                        <Heading as="h1" mb={4}>
                            Mini Quiz
                        </Heading>
                        <form onSubmit={handleFormSubmit}>
                            <Stack key={currentQuestion.id} spacing={4} mb={6}>
                                <Heading as="h2" size="md">
                                    {currentQuestion.question_text}
                                </Heading>
                                <RadioGroup
                                    onChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                                    value={selectedAnswers[currentQuestion.id] || ""}
                                >
                                    <Stack spacing={2}>
                                        {currentQuestion.Choices.map((option, idx) => (
                                            <Radio key={idx} value={option.choice_text}>
                                                {option.choice_text}
                                            </Radio>
                                        ))}
                                    </Stack>
                                </RadioGroup>
                            </Stack>
                            <Button colorScheme="teal" type="submit">
                                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Submit"}
                            </Button>
                        </form>
                    </div>
                )}
            </Container>
        </Layout>
    );
}
