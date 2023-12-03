import { DragProvider } from './context/DragContext'
import { OuterCircle } from './component/OuterCircle'
import { Dimensions } from './component/Dimensions'


function App() {

  return (
    <DragProvider>
      <OuterCircle />
      <Dimensions />
    </DragProvider>
  )
}

export default App
