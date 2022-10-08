type ContainerProps = {
  children: JSX.Element
}

const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return <div className='pageContainer'>{children}</div>
}

export default Container
