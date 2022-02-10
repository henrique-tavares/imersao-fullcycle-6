import { NextPage } from 'next';
import useSWR from 'swr';
import Title from '../components/Title';
import { Tweet } from '../components/Tweet';
import axios from '../utils/axios';
import { Tweet as TweetModel } from '../utils/models';

const axiosFetcher = (url: string) => axios.get(url).then(res => res.data);

const TweetsPage: NextPage = () => {
  const { data: tweets } = useSWR<TweetModel[]>('tweets', axiosFetcher, { refreshInterval: 5000, fallbackData: [] });

  return (
    <div>
      <Title>Tweets</Title>
      {tweets?.map((tweet, i) => (
        <Tweet key={i} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetsPage;
