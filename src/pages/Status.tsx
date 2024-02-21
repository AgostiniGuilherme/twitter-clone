import { FormEvent, KeyboardEvent, useState } from "react";
import { Header } from "../components/Header";
import { Separator } from "../components/Separator";
import { Tweet } from "../components/Tweet";

import "./Status.css";
import { PaperPlaneRight } from "@phosphor-icons/react";

/**
 * Fluxo de Renderização
 *
 * 1. Toda vez que alteramos o estado de um componente, TODO componente é recalculado.
 * 2. Toda vez que o seu componente PAI renderizar.
 * 3. Toda vez que alguma de suas propriedades mudarem.
 */

/**
 * Algoritmo de Reconciliação
 *
 * 1. Cria a nova versão do HTML do componente
 * 2. Compara essa nova versão com a anterior do HTML (Diff)
 * 3. Aplicar as operações JavaScript para alterar somente o necessário no HTML
 */

export function Status() {
	const [newAnswer, setNewAnswer] = useState("");
	const [answers, setAnswers] = useState([
		"Concordo...",
		"Olha, faz sentido",
		"I am the Walrus",
	]);

	function createNewAnswer(event: FormEvent) {
		event.preventDefault();

		setAnswers([newAnswer, ...answers]);
		setNewAnswer("");
	}

	function handleHotKeySubmit(event: KeyboardEvent) {
		if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
			setAnswers([newAnswer, ...answers]);
			setNewAnswer("");
		}
	}

	return (
		<main className="timeline">
			<Header title="Tweet" />

			<Tweet content="Lorem ipsum dolor sit amet consectetur adipisicing elit." />

			<Separator />

			<form onSubmit={createNewAnswer} className="answer-tweet-form">
				<label htmlFor="tweet">
					<img
						src="https://github.com/agostiniguilherme.png"
						alt="Guilherme Agostini"
					/>
					<textarea
						id="tweet"
						placeholder="Tweet your answer"
						value={newAnswer}
						onKeyDown={handleHotKeySubmit}
						onChange={(event) => {
							setNewAnswer(event.target.value);
						}}
					/>
				</label>

				<button type="submit">
					<PaperPlaneRight />
					<span>Answer</span>
				</button>
			</form>

			{answers.map((answer) => {
				return <Tweet key={answer} content={answer} />;
			})}
		</main>
	);
}
