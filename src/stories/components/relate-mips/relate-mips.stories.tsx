import React from 'react';
import RelateMips from './relate-mips';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CuMip } from '../../containers/cu-about/cu-about.api';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';

export default {
  title: 'Components/CUAbout/RelateMips',
  component: RelateMips
} as ComponentMeta<typeof RelateMips>;

const Template: ComponentStory<typeof RelateMips> = (args) => <RelateMips {...args} />;
export const WithData = Template.bind({});
WithData.args = {
  relateMips: {
    mipTitle: 'MIP40c3-SP1:Modify Core Unit Budget - Real-World Finance (RWF-001)',
    mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP10',
    mipStatus: CuStatusEnum.Accepted,
    accepted: '2019-06-11',
    obsolete: '2019-06-11',
    rfc: '2019-06-11',
    cuId: '1',
    mipCode: 'MIP39c2-SP10',
    formalSubmission: '2019-06-11',
    rejected: '2019-06-11',
  } as CuMip
};

export const DataWithLargeText = Template.bind({});
DataWithLargeText.args = {
  relateMips: {
    mipTitle: 'MIP40c3-SP1:Modify Core Unit Budget - Real-World Finance (RWF-001) Other Data Here Real-World Finance (RWF-001) Other Data HereReal-World Finance (RWF-001) Other Data HereReal-World Finance (RWF-001) Other Data HereReal-World Finance (RWF-001) Other Data Here',
    mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP10 ',
    mipStatus: CuStatusEnum.Accepted,
    accepted: '2019-06-11',
    obsolete: '2019-06-11',
    rfc: '2019-06-11',
    cuId: '1',
    mipCode: 'MIP39c2-SP10',
    formalSubmission: '2019-06-11',
    rejected: '2019-06-11',
  } as CuMip
};
