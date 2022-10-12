import { useEffect, useState } from "react";
import { Professor } from "../../@types/professor";
import { APIService } from "../../services/ApiService";

export function useIndex() {
    const [listaProfessores, setlistaProfessores] = useState<Professor[]>([]);
    const [nome, setNome] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [professorSelecionado, setProfessorSelecionado] = useState<Professor | null>(null);
    const [mensagem, setMensagem] = useState(' ');

    useEffect(() => {
        APIService.get('/professores').then((resposta) => {
            setlistaProfessores(resposta.data)
        })
    }, []);

    useEffect(() => {
        limparFormulario();
    }, [professorSelecionado]);

    function marcarAula() {
        if (professorSelecionado !== null) {
            if(validarDadosAula()) {
                APIService.post('/professores/' + professorSelecionado.id + '/aulas', {
                    nome,
                    email
                }).then(() => {
                    setProfessorSelecionado(null);
                    setMensagem('Cadastrado com sucesso');
                }).catch((error) => {
                    setMensagem(error.response?.data.message);
                });
            } else {
                setMensagem('Preencha os dados corretamente');
            }
        }
    }

    function validarDadosAula() {
        return nome.length > 0 && email.length > 0;
    }   

    function limparFormulario() {
        setNome(' ');
        setEmail(' ');
    }

    return {
        listaProfessores,
        nome,
        setNome,
        email,
        setEmail,
        professorSelecionado,
        setProfessorSelecionado,
        marcarAula,
        mensagem,
        setMensagem,
    }
}