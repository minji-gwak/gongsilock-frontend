'use server';

const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.BASE_API_URL;
const TIMETABLE_API_URL = `${BASE_API_URL}/timetable`;

const TIMETABLE_ENDPOINT = {
  Default: `${TIMETABLE_API_URL}`,
  At: (timetableId: string) => `${TIMETABLE_API_URL}/${timetableId}`,
};

export const fetchTimetableDetails = async (timetableId: string) => {
  return await fetch(TIMETABLE_ENDPOINT.At(timetableId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
