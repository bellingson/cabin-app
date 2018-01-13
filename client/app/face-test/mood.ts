
export enum Mood {
  NOT_AT_ALL,
  A_LITTLE,
  MODERATELY,
  QUITE_A_BIT,
  EXTREMELY
}

export const MOODS = [ Mood.NOT_AT_ALL, Mood.A_LITTLE, Mood.MODERATELY, Mood.QUITE_A_BIT, Mood.EXTREMELY ];

export const MOOD_CATEGORY = [
  'Active',
  'Determined',
  'Attentive',
  'Inspired',
  'Alert',
  'Afraid',
  'Nervous',
  'Upset',
  'Hostile',
  'Ashamed'
];

export function moodDescription(mood: number) : string {

  switch (mood) {
    case Mood.NOT_AT_ALL:
        return 'Not at All';
    case Mood.A_LITTLE:
        return 'A Little';
    case Mood.MODERATELY:
        return 'Moderately';
    case Mood.QUITE_A_BIT:
        return 'Quite a Bit';
    case Mood.EXTREMELY:
        return 'Extremely';
    default:
        return 'unknown';
  }
}
