import * as S from './styles'
import { HTMLInputTypeAttribute, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Input } from "../../../components/inputs/index"
import { Button } from "./../../../components/buttons/index"
import { FormStructure } from "../../layouts/form"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormSchemaLogin } from "../../validations/Auth"
import { StatePassword, StateTypePassword } from "../register"
import { CampPassword } from './../register/styles';
import { IDataUser, IRegister } from "../../interfaces/auth"
import { UseUserContext } from "../../../context/UserContext"

export const Login = () => {
  const [typeInput, setTypeInput] = useState<HTMLInputTypeAttribute>("password")
  const [passwordIconStatus, setPasswordIconStatus] = useState<StatePassword>(false)

  const { loginUser } = UseUserContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: yupResolver(FormSchemaLogin),
  })

  const toogleIconPassword = () => {
    setPasswordIconStatus((value) => !value)
    typeInput === "password" ? setTypeInput("text") : setTypeInput("password")
  }

  return (
    <S.LoginStyled>
      <FormStructure title={"Faça seu Login"} maxWidth={450}>
        <S.FormLogin onSubmit={handleSubmit(loginUser)}>
          <Input
            name={"email"}
            label={"Email"}
            type="text"
            placeholder="Insira seu email aqui"
            register={register}
            error={errors.email}
          />
          <CampPassword>
            <Input
              name={"password"}
              label={"Senha"}
              type={typeInput}
              placeholder="Insira sua senha aqui"
              register={register}
              error={errors.password}
            />
            {passwordIconStatus ? (
              <AiOutlineEye onClick={toogleIconPassword} />
            ) : (
              <AiOutlineEyeInvisible onClick={toogleIconPassword} />
            )}
          </CampPassword>
          <Button type="submit" variant="primary">Entrar</Button>
        </S.FormLogin>
        <S.CampRedirectRegister>
          <p>Ainda não possui conta? <S.SpanRegister to="/register">registro aqui</S.SpanRegister></p>
        </S.CampRedirectRegister>
      </FormStructure>
    </S.LoginStyled>
  )
}
