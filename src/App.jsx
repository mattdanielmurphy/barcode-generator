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
