type Props = {}

function CustomTextInput(props: Props) {
  // textInput must be declared here so the ref can refer to it
  const textInput = React.createRef<HTMLInputElement>()

  function handleClick() {
    if (textInput.current) {
      textInput.current.focus()
    }
  }

  return (
    <div>
      <input type="text" ref={textInput} />

      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  )
}
