import InputComponent from "@/components/input/input.component";
import styles from "./page.module.scss";
import FormComponent from "@/components/form/form.component";
const page = () => {
  return (
    <main className={styles.main}>
      <FormComponent
        title="ورود"
        subTitle=" سلام، لطفا اطلاعات کاربری خود را وارد کنید."
      >
        <InputComponent
          isFocused={true}
          title="نام کابری: "
          id="username"
          type="text"
        />
        <InputComponent title="کلمه عبور: " id="password" type="password" />
      </FormComponent>
    </main>
  );
};

export default page;
