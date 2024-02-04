import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Auth from "@/components/Auth";
import { useRouter } from "next/router";

export default function signin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let cookieToken = window.localStorage.getItem("token");
    let cookieEmail = window.localStorage.getItem("email");

    if (cookieToken && cookieEmail) {
      router.push("/library");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);

    const auth = getAuth();

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((user) => {
        console.log(user);

        window.localStorage.setItem("token", user.user.accessToken);
        window.localStorage.setItem("email", user.user.email);

        router.push("/library");

        // const email = user.user.email;
        // const refreshToken = user._tokenResponse.refreshToken;
        // const idToken = user._tokenResponse.idToken;
        // const accessToken = user.user.accessToken;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex h-screen">
        <div className="flex flex-col gap-24 px-48 py-10">
          <div>
            <h1 className="text-white text-3xl font-['Satoshi']-bold">
              Welcome!
            </h1>
            <h2 className="text-white text-lg font-normal font-['Satoshi']-regular">
              Sign in to continue your journey
            </h2>
          </div>
          <div className="">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3 border border-white rounded-lg p-8">
                <div>
                  <label
                    className="text-white text-xl font-medium font-['Satoshi']-medium leading-normal"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="w-full h-9 px-3 bg-zinc-300 rounded-lg"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className="text-white text-xl font-medium font-['Satoshi']-medium leading-normal"
                    htmlFor="password"
                  >
                    Password:
                  </label>
                  <input
                    className="w-full h-9 px-3 bg-zinc-300 rounded-lg"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className="w-full px-4 py-2 bg-sky-500 rounded-md text-white text-xl font-medium font-['Satoshi']-medium"
                type="submit"
              >
                Sign In
              </button>
            </form>
            <div className="w-full my-4 text-center text-white font-medium font-['Satoshi']-medium">
              or
            </div>
            <div>
              <Auth />
            </div>
          </div>
        </div>
        <div className="bg-gray-300 w-1/2 flex justify-center items-center">
          <img className="guy_image" src="amico.png" />
        </div>
      </div>
    </div>
  );
}
