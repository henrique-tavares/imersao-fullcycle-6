import Image from 'next/image';
import React from 'react';
import { Tweet as TweetModel } from '../utils/models';
import TimeAgo from 'javascript-time-ago';
import pt from 'javascript-time-ago/locale/pt-PT.json';

TimeAgo.addDefaultLocale(pt);
const timeAgo = new TimeAgo('pt-PT');

type TweetProps = {
  tweet: TweetModel;
};

export const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  return (
    <div className='px-4 py-3 border-t'>
      <div className='flex items-center'>
        <div className='h-10 w-10 relative flex flex-shrink-0'>
          <Image
            src={tweet.User.BiggerProfileImageURLHttps}
            alt='user'
            layout='fill'
            objectFit='cover'
            className='rounded-full'
          />
        </div>
        <div className='ml-3'>
          <p className='text-base leading-6 font-medium text-black dark:text-white'>
            {tweet.User.Name}
            <span className='text-sm font-normal text-gray-600 dark:text-gray-400'>
              @{tweet.User.ScreenName} . {timeAgo.format(tweet.CreatedAt)}
            </span>
          </p>
        </div>
      </div>
      <div className='pl-16 mb-3'>
        <p className='text-black dark:text-white'>{tweet.Text}</p>
      </div>
    </div>
  );
};
