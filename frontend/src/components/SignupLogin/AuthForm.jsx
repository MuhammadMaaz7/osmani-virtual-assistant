import React from "react";
import InputField from "./InputField";

const AuthForm = ({ isLogin, onSubmit, errors }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <InputField
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
      )}
      <InputField
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <InputField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        showPasswordToggle={true}
      />
      {errors.general && (
        <p className="text-sm text-red-500 mt-2">{errors.general}</p>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;