import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import getValidationErros from '../../utils/getValidationErros'

import logoImg from '../../assets/logo.svg'

import Button from '../../assets/components/Button'
import Input from '../../assets/components/Input'

import { Container, Content, Background } from './styles'
import { Link } from 'react-router-dom'

interface SingInFromData{
    email: string
    password: string
}

const SingIn: React.FC = () =>{
    const formRef = useRef<FormHandles>(null)

    const { signIn } = useAuth()
    const { addToast } = useToast()

    const handleSubmit = useCallback(async (data: SingInFromData) => {
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatoria')
            })
            await schema.validate(data, {
                abortEarly: false
            })
            await signIn({
                email: data.email,
                password: data.password
            })
        } catch(err){

            if(err instanceof Yup.ValidationError){
                
                const errors = getValidationErros(err)

                formRef.current?.setErrors(errors)
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Senha invalidade'

            })
            
        }
    }, [signIn, addToast])
    
    
    return(
        <Container>
            <Content>
                <img src={logoImg} alt="Digital Bank"/>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="E-Mail" />

                    <Input name="password" icon={FiLock} type="password" placeholder="Password" />

                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>

                </Form>

                <Link to="/SignUp">
                        <FiLogIn />
                        Criar conta
                </Link>

            </Content>

            <Background />

        </Container>
    )
}

export default SingIn