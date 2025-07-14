import ButtonComponent from "../button/button.component";
import CardParentComponent from "../card-parent/cardParent.component";
import FormComponent from "../form/form.component";
import InputComponent from "../input/input.component";

const SignupComponent = () => {
  const inputs = [
    {
      isFocused: true,
      title: "نام کابری: ",
      id: "username",
      type: "text",
    },
    {
      isFocused: false,
      title: "کلمه عبور: ",
      id: "password",
      type: "password",
    },
    {
      isFocused: false,
      title: "ایمیل",
      id: "email",
      type: "email",
    },
  ];
  return (
    <CardParentComponent>
      <FormComponent title="ثبت نام" subTitle="لطفا اطلاعات خود را وارد کنید">
        {inputs.map((item) => {
          return (
            <InputComponent
              key={item.id}
              isFocused={item.isFocused}
              title={item.title}
              id={item.id}
              type={item.type}
            />
          );
        })}
        <ButtonComponent content="ثبت نام" type="submit" />
      </FormComponent>
    </CardParentComponent>
  );
};

export default SignupComponent;
