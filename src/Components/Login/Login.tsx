import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

// Importações do Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Verifique o caminho para seu arquivo de config
import { FirebaseError } from 'firebase/app';

const Login = () => {
  
    // O ideal é usar "email" aqui, já que o input é do tipo email
    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>(""); // Estado para guardar mensagens de erro

    const navigate = useNavigate();

    // A função de submit agora precisa ser assíncrona
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(""); // Limpa erros anteriores

        if (!email || !password) {
            setError("Por favor, preencha o e-mail e a senha.");
            return;
        }

        try {
            // Tenta fazer o login com o Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login bem-sucedido! Redirecionando...");

            // Obter claims do token de ID
            const idTokenResult = await userCredential.user.getIdTokenResult();
            const claims = idTokenResult.claims;

            // Redirecionar baseado no papel
            if (claims.admin) {
                navigate("/admin-dashboard");
            } else if (claims.student) {
                navigate("/modules");
            } else {
                // Se não tiver papel, redirecionar para unauthorized ou default
                navigate("/unauthorized");
            }
        } catch (err) {
            // Captura e trata os erros do Firebase
            const error = err as FirebaseError;
            console.error("Erro no login:", error.code);
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                setError("E-mail ou senha inválidos.");
            } else {
                setError("Ocorreu um erro ao tentar fazer o login. Tente novamente.");
            }
        }
    }
    
    return (
        
        <div className="login-wrapper"> 
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Acesse o sistema</h1>
                    {/* Exibe a mensagem de erro se houver uma */}
                    {error && <p className="error-message">{error}</p>}
                    <div className="input-field">
                        {/* Note que o tipo é 'email' e o onChange atualiza o estado 'email' */}
                        <input 
                            type="email" 
                            placeholder="E-mail" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            value={email} // Boa prática adicionar o value
                        />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-field">
                        <input 
                            type="password" 
                            placeholder='Senha' 
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            value={password} // Boa prática adicionar o value
                        />
                        <FaLock className="icon"/>
                    </div>
                    
                    <div className="recall-forget">
                        <label>
                            <input type="checkbox" />
                            Lembre de mim
                        </label>
                        <a href="#">Esqueceu a senha?</a>
                    </div>

                    <button type="submit">Entrar</button>

                    <div className="signup-link">
                        <p>Não tem uma conta? <a href="#">Registrar</a></p>
                    </div>
                </form>
            </div>
        </div>    
    )
}

export default Login;