import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import { Button } from '../components/Button';
import Title from '../components/Title';
import axios from '../utils/axios';

const axiosFetcher = (url: string) => axios.get(url).then(res => (res.data === '' ? [] : res.data.emails));

const Emails: NextPage = () => {
  const { data: emails } = useSWR('mail-list', axiosFetcher, { fallbackData: [] });

  const [rawEmails, setRawEmails] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const emails = rawEmails.split('\n');
    await axios.post('/mail-list', { emails });
  }

  return (
    <div>
      <div className='border-b mb-4'>
        <Title>Emails</Title>
      </div>
      <form onSubmit={onSubmit}>
        <textarea
          id='emails'
          rows={10}
          className='border rounded w-full p-3 text-black dark:text-white leading-tight focus:outline-none focus:shadow bg-slate-100 dark:bg-slate-700'
          value={rawEmails}
          defaultValue={emails.join('\n')}
          onChange={e => setRawEmails(e.target.value)}
        ></textarea>
        <Button type='submit'>Salvar</Button>
      </form>
    </div>
  );
};

export default Emails;
