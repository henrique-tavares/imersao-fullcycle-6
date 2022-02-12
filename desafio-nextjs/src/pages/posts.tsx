import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';

type PostsPageProps = {
  posts: {
    profilePicture: string;
    name: string;
    content: string;
  }[];
};

const PostsPage: NextPage<PostsPageProps> = props => {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className='container mx-auto flex flex-col'>
      <h1 className='text-4xl text-gray-800 py-3 mx-auto'>Listagem de Posts</h1>
      {props.posts.map((post, i) => (
        <div className='px-4 py-3 border-t' key={i}>
          <div className='flex items-center'>
            <div className='h-10 w-10 relative flex flex-shrink-0'>
              <Image src={post.profilePicture} alt='user' layout='fill' objectFit='cover' className='rounded-full' />
            </div>
            <div className='ml-3'>
              <span className='text-base leading-6 font-medium text-black'>{post.name}</span>
            </div>
          </div>
          <div className='pl-16 mb-3'>
            <p className='text-black'>{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      posts: [
        {
          profilePicture: 'https://github.com/henrique-tavares.png',
          name: 'Henrique Tavares',
          content: 'bla bla bla.....',
        },
        {
          profilePicture: 'https://github.com/henrique-tavares.png',
          name: 'Henrique Tavares',
          content: 'bla bla bla.....',
        },
        {
          profilePicture: 'https://github.com/henrique-tavares.png',
          name: 'Henrique Tavares',
          content: 'bla bla bla.....',
        },
        {
          profilePicture: 'https://github.com/henrique-tavares.png',
          name: 'Henrique Tavares',
          content: 'bla bla bla.....',
        },
        {
          profilePicture: 'https://github.com/henrique-tavares.png',
          name: 'Henrique Tavares',
          content: 'bla bla bla.....',
        },
      ],
    },
  };
};

export default PostsPage;
