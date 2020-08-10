import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErros from '../../utils/getValidationErros'

import logoImg from '../../assets/logo.svg'

import Button from '../../assets/components/Button'
import Input from '../../assets/components/Input'

import { Container, Content, Background } from './styles'
import { Link } from 'react-router-dom'

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null)


    const handleSubmit = useCallback(async (data: object) => {
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome Obrigatorio'),
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No minimo 6 digitos')
            })
            await schema.validate(data, {
                abortEarly: false
            })
        } catch(err){

            const errors = getValidationErros(err)

            formRef.current?.setErrors(errors)
        }
    }, [])


    return(
        <Container>
            <Background />

            <Content>
                <img src={logoImg} alt="Digital Bank"/>

                <Form ref={formRef} onSubmit={ handleSubmit }>
                    <h1>Faça seu Cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome" />

                    <Input name="email" icon={FiMail} placeholder="E-Mail" />

                    <Input name="password" icon={FiLock} type="password" placeholder="Password" />

                    <Button type="submit">Cadastrar</Button>

                </Form>

                <Link to="/">
                        <FiArrowLeft />
                        Voltar para logon
                </Link>

            </Content>

        </Container>
    )
}

export default SignUp