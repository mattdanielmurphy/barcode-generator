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
		overflow: hidden;
	}
	
	input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button { 
		-webkit-appearance: none; 
		margin: 0; 
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
