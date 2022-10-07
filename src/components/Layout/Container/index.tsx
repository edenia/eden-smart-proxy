type ContainerProps = {
  children: JSX.Element
}

const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return (
    <div style={{ border: '2px solid orange', height: '100%' }}>{children}</div>
  )
}

export default Container
