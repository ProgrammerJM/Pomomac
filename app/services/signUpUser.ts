import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toSentenceCase } from "../util/toSentenceCase";

export async function handleSubmitSignUp(
  event: FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: ReturnType<typeof useRouter>
) {
  event.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData(event.currentTarget);
    let firstName = formData.get("firstName") as string;
    let lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    firstName = toSentenceCase(firstName);
    lastName = toSentenceCase(lastName);

    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    if (response.ok) {
      setError(null);
      setLoading(false);
      setMessage(data.message);
      router.push("/login");
    }
  } catch (error: any) {
    console.error(error);
  }
}
