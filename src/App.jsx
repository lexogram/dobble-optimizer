import { DragProvider } from './context/DragContext'
import { OuterCircle } from './component/OuterCircle'
import { Dimensions } from './component/Dimensions'
import { SaveDialog } from './component/SaveDialog'

function App() {

  return (
    <DragProvider>
      <OuterCircle />
      <Dimensions />
      <SaveDialog />
    </DragProvider>
  )
}

export default App
