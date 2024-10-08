import React, { FC } from 'react';
import Layout from 'commons/template/Layout';
import { DashboardTabType } from 'commons/types/global';
import UserSetting from 'commons/template/Setting/UserSetting';
import SchoolSetting from 'commons/template/Setting/SchoolSetting';
import UniversitySetting from 'commons/template/Setting/UniversitySetting';
import Dashboard from 'commons/components/organisms/Dashboard';

let tabs: DashboardTabType[] = [
  {
    slug: 'user',
    label: 'اطلاعات فردی',
    component: <UserSetting />,
    disabled: false,
  },
  {
    slug: 'school',
    label: 'اطلاعات دانش‌آموزی',
    component: <SchoolSetting />,
    disabled: false,
  },
  {
    slug: 'university',
    label: 'اطلاعات دانشجویی',
    component: <UniversitySetting />,
    disabled: true,
  },
];

type SettingPropsType = {}

const Setting: FC<SettingPropsType> = ({ }) => {

  return (
    <Layout appbarMode={'DASHBOARD'}>
      <Dashboard tabs={tabs} />
    </Layout>
  );
};

export default Setting;