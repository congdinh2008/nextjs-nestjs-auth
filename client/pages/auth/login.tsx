import Image from "next/future/image";
import Link from "next/link";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { resolve } from "path";
import { useRouter } from "next/router";
import { error } from "console";
import { useState } from "react";
import MessageDialog from "../../components/modal-dialog";
import ModalDialog from "../../components/modal-dialog";

export default function Login({ csrfToken }: { csrfToken: any }) {
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>();

  const router = useRouter();

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    const data = {
      username: event.target.userName.value,
      password: event.target.password.value,
    };

    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res && res.status === 200 && res.ok) {
      router.push("/");
    }

    if (res?.status === 400 || res?.status === 401) {
      setIsShowMessage(true);
      setDialogMessage(res.error);
    }
  };
  return (
    <div className="bg-purple">
      <ModalDialog
        title={"Login Failed"}
        onClose={() => setIsShowMessage(false)}
        isShow={isShowMessage}
        data={{ message: dialogMessage }}
      />
      <div className="stars">
        <div className="central-body">
          <form method="post" className="login" onSubmit={onSubmitHandler}>
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <div className="form-group mb-3">
              <input
                type="text"
                name="userName"
                id="user-name"
                className="form-control"
                placeholder="User Name"
                required
                autoComplete="username"
              ></input>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Password"
                autoComplete="current-password"
                required
              ></input>
            </div>
            <div className="d-flex">
              <Link href="/">
                <button
                  type="button"
                  title="Back"
                  className="btn-signin text-dark me-1"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                title="Login"
                className="btn-signin text-dark"
              >
                Login
              </button>
            </div>
            <Link href="/auth/register">or Register an account</Link>
          </form>
        </div>
        <div className="objects">
          <Image
            className="object_rocket"
            src="/images/rocket.svg"
            alt="Rocket"
            width={40}
            height={40}
          ></Image>

          <div className="earth-moon">
            <Image
              className="object_earth"
              src="/images/earth.svg"
              alt="Earth"
              width={100}
              height={100}
            ></Image>
            <Image
              className="object_moon"
              src="/images/moon.svg"
              alt="Moon"
              width={80}
              height={80}
            ></Image>
          </div>

          <div className="box_astronaut">
            <Image
              className="object_astronaut"
              src="/images/astronaut.svg"
              alt="Astronaut"
              width={140}
              height={140}
              priority
            ></Image>
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
}
