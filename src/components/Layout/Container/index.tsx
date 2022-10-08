type ContainerProps = {
  children: JSX.Element
}

const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return (
    <div className='pageContainer'>
      <div className='internScroll'>{children}</div>
    </div>
  )
}

export default Container
