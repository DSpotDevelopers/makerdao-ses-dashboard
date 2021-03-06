import { CuCategoryEnum } from '../enums/cu-category.enum';
import { CuJobEnum } from '../enums/cu-job.enum';

export const getColorForString = (value: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < value?.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const getColorCategory = (category: CuCategoryEnum) => {
  switch (category) {
    case CuCategoryEnum.Technical:
      return {
        color: '#546978',
        background: 'rgba(246, 245, 255, 0.5)',
      };
    case CuCategoryEnum.Growth:
      return {
        color: '#DC5D00',
        background: 'rgba(255, 245, 245, 0.5);',
      };
    case CuCategoryEnum.Support:
      return {
        color: '#1AAB9B',
        background: 'rgba(245, 255, 246, 0.5)',
      };

    case CuCategoryEnum.Operational:
      return {
        color: '#9055AF',
        background: 'rgba(250, 245, 255, 0.5)',
      };
    case CuCategoryEnum.RWAs:
      return {
        color: '#2DC1B1',
        background: 'rgba(245, 255, 249, 0.5)',
      };
    case CuCategoryEnum.Finance:
      return {
        color: '#447AFB',
        background: 'rgba(247, 255, 245, 0.52)',
      };
    case CuCategoryEnum.Business:
      return {
        color: '#F08B04',
        background: 'rgba(255, 251, 245, 0.5)',
      };

    default:
      return {
        color: '#25273D',
        background: 'white',
      };
  }
};

export const getColorJobPosition = (job: CuJobEnum) => {
  switch (job) {
    case CuJobEnum.DataExpert:
      return {
        color: '#8F2EC1',
      };
    case CuJobEnum.Facilitator:
      return {
        color: '#1AAB9B',
      };
    case CuJobEnum.ProjectLead:
      return {
        color: '#635696',
      };

    case CuJobEnum.ResearchExpert:
      return {
        color: '#00B5D3',
      };
    case CuJobEnum.TeamLead:
      return {
        color: '#FF4085',
      };
    case CuJobEnum.TechExpert:
      return {
        color: '#F08B04',
      };
    default:
      return {
        color: '#000000',
      };
  }
};
