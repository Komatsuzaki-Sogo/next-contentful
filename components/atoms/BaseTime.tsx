import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { FC } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  date: string;
};

export const BaseTime: FC<Props> = ({ date }) => {
  const tokyoTime = dayjs(date).tz('Asia/Tokyo');
  return (
    <time dateTime={date} className="text-gray-500 block">
      {tokyoTime.format('YYYY/MM/DD')}
    </time>
  );
};
