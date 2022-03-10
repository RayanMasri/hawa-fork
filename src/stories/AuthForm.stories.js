import React from "react";
import {
  NewPasswordForm,
  ResetPasswordForm,
  SignInForm,
  SignUpForm
} from "../blocks/AuthForms";
import { defaultTheme, HawaProvider } from "../themes/HawaProvider";

export default {
  title: "Blocks/AuthForms",
  component: SignInForm,
  argsTypes: {
    viaGoogle: { control: "boolean" },
    viaGithub: { control: "boolean" },
    viaTwitter: { control: "boolean" },
    viaFacebook: { control: "boolean" }
  },
  args: {}
};

const theme = {
  borderRadius: 20,
  primaryColor: "green",
  secondaryColor: "red",
  inputColor: "lightGrey",
  paddings: 10,
  paperColors: 'blue'
};

const SignInTemplate = (args) => {
  return (
    <HawaProvider theme={{ ...defaultTheme }}>
      <SignInForm {...args} />
    </HawaProvider>
  );
};

export const SignIn = SignInTemplate.bind({});
SignIn.args = {
  viaGoogle: true,
  viaGithub: true,
  viaTwitter: true,
  viaFacebook: true
};

const SignUpTemplate = (args) => {
  return (
    <HawaProvider theme={{ ...defaultTheme }}>
      <SignUpForm {...args} />
    </HawaProvider>
  );
};
export const SignUp = SignUpTemplate.bind({});
SignUp.args = {
  viaGoogle: true,
  viaGithub: true,
  viaTwitter: true,
  viaFacebook: true
};

const ResetPasswordTemplate = (args) => {
  return (
    <HawaProvider theme={{ ...defaultTheme }}>
      <ResetPasswordForm {...args} />
    </HawaProvider>
  );
};
export const ResetPassword = ResetPasswordTemplate.bind({});
ResetPassword.args = {};
const NewPasswordTemplate = (args) => {
  return (
    <HawaProvider theme={{ ...defaultTheme }}>
      <NewPasswordForm {...args} />
    </HawaProvider>
  );
};
export const NewPassword = NewPasswordTemplate.bind({});
NewPassword.args = {};
