import { Field, Form, Formik } from "formik";
import style from "./message-input-bar.module.sass";

type MessageProps = {
  message: string;
};

export const MessageInputBar = () => {
  const initialValues = {
    message: "",
  };

  const handleSubmit = async (values: MessageProps) => {
    console.log(values.message);
  };

  return (
    <div className={style["message-input-bar"]}>
      <div className={style["message-input-bar__message-input-container"]}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit }) => (
            <Form
              noValidate
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className={style["message-input-bar__form"]}
            >
              <Field
                id="message"
                name="message"
                type="message"
                placeholder="Написать сообщение"
                className={style["message-input-bar__form-field"]}
              />
            </Form>
          )}
        </Formik>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="21"
            viewBox="0 0 33 21"
            fill="none"
          >
            <path
              d="M18.4613 2.18897L29.6899 8.12996L30.6048 6.44781L19.3762 0.506764L18.4613 2.18897ZM29.6867 12.8975L18.464 18.8128L19.3762 20.4964L30.5989 14.5811L29.6867 12.8975ZM15.0716 15.601L16.4206 11.1571L14.5664 10.6096L13.2174 15.0535L15.0716 15.601ZM16.4212 9.88175L15.0648 5.39611L13.21 5.94173L14.5665 10.4273L16.4212 9.88175ZM18.464 18.8128C17.518 19.3114 16.5335 19.1019 15.8272 18.4621C15.1142 17.8159 14.7222 16.7519 15.0716 15.601L13.2174 15.0535C12.6443 16.9415 13.2883 18.7537 14.5178 19.8678C15.7541 20.988 17.6186 21.4229 19.3762 20.4964L18.464 18.8128ZM29.6899 8.12996C31.5246 9.10073 31.5221 11.9299 29.6867 12.8975L30.5989 14.5811C33.7978 12.895 33.8009 8.13887 30.6048 6.44781L29.6899 8.12996ZM19.3762 0.506764C17.6197 -0.422611 15.7542 0.00949112 14.5162 1.1283C13.2851 2.24092 12.6388 4.05268 13.21 5.94173L15.0648 5.39611C14.7165 4.24453 15.1099 3.18095 15.8237 2.53578C16.5308 1.89681 17.5157 1.68869 18.4613 2.18897L19.3762 0.506764ZM16.4206 11.1571C16.5468 10.7412 16.5471 10.2979 16.4212 9.88175L14.5665 10.4273C14.5845 10.4868 14.5844 10.5501 14.5664 10.6096L16.4206 11.1571Z"
              fill="#363853"
            />
            <path
              d="M9 5H5"
              stroke="#0095FF"
              stroke-width="4"
              stroke-linecap="round"
            />
            <path
              d="M8 18H6"
              stroke="#0095FF"
              stroke-width="4"
              stroke-linecap="round"
            />
            <path
              d="M6 12H2"
              stroke="#0095FF"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
