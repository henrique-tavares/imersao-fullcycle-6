type TitlePros = {};

const Title: React.FC<TitlePros> = props => {
  return <h1 className='text-5xl leading-normal text-gray-700 dark:text-white'>{props.children}</h1>;
};

export default Title;
