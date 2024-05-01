import AuthLayouts from "../components/Layouts/AuthLayouts"
import FormRegister from "../components/Fragments/FormRegister"

const RegisterPage = () => {
  return (
    <AuthLayouts type="Register">
      <FormRegister />
    </AuthLayouts>
  )

}

export default RegisterPage