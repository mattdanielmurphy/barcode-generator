import styled, { createGlobalStyle } from 'styled-components'

import Generator from './Generator'

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
			'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
			'Helvetica Neue', sans-serif !important;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
`

const Wrapper = styled.div`
	body,
	html,
	#app {
		height: 100%;
		display: flex;
		justify-content: space-around;
	}

	nav {
		display: flex;
		justify-content: center;
		margin: 2em 0 5em 0;
	}
	nav:last-of-type {
		margin-bottom: 0;
	}

	.up-down-nav {
		margin-left: 2em;
		padding: 1em 1.2em;
	}

	h3 {
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: grey;
		font-weight: normal;
	}
	a.button {
		padding: 1em 1.2em;
		background: rgba(0, 0, 0, 0.04);
		text-decoration: none;
		text-transform: uppercase;
		font-size: 1.1em;
		font-weight: normal;
		letter-spacing: 0.05em;
		color: rgb(0, 0, 0);
	}

	.scan-more {
		width: 100%;
		text-align: center;
		padding-bottom: 4em;
	}

	.scan-more .button {
		background: rgb(135, 197, 255);
		color: #fff;
		border: none;
		padding: 0.8em;
		border-radius: 0.5em;
	}
`

function App() {
	return (
		<Wrapper>
			<GlobalStyle />
			<Generator />
		</Wrapper>
	)
}

export default App
