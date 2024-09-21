import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ResetPassword from 'apps/website-display/pages/ResetPassword';
import CreateAccount from 'apps/website-display/pages/CreateAccount';
import RegistrationReceipt from 'apps/website-display/pages/RegistrationReceipt';
import Programs from 'apps/website-display/pages/Programs';
import Setting from 'apps/website-display/pages/Setting';
import Program from 'apps/website-display/pages/Program';
import ProgramManagement from 'apps/website-display/pages/ProgramManagement';
import NotFoundPage from 'apps/website-display/pages/Message/NotFoundPage';
import Login from 'apps/website-display/pages/Login';
import FailedPayment from 'apps/website-display/pages/Message/FailedPayment';
import SuccessfulPayment from 'apps/website-display/pages/Message/SuccessfulPayment';
import Registration from 'apps/website-display/pages/Registration';
import TeamSetting from 'apps/website-display/pages/TeamSetting';
import FSM from 'apps/website-display/pages/FSM';
import Article from 'apps/website-display/pages/Article';
import Articles from 'apps/website-display/pages/Articles';
import PrivateRoute from 'commons/routes/PrivateRoute';
import FSMManagement from 'apps/website-display/pages/FSMManagement';
import Correction from 'apps/website-display/pages/Correction';
import EditArticle from 'apps/website-display/pages/EditArticle';
import ProfilePage from 'apps/website-display/pages/Profile';
import WebsiteManagement from 'apps/website-factory/pages/WebsiteManagement';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import Notifications from 'apps/chat/pages/Notifications';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/programs/'} />} />
      <Route path="/articles/" element={<Articles />} />
      <Route path="/article/:articleId/" element={<Article />} />
      <Route path="/programs/" element={<Programs />} />
      <Route path="/profile/:partyType/:partyId/" element={<ProfilePage />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/notifications/" element={<Notifications />} />
        <Route path="/edit-article/:articleId/" element={<EditArticle />} />
        <Route
          path="/message/payment/success/:paymentId?/"
          element={<SuccessfulPayment />}
        />
        <Route
          path="/message/payment/failure/:paymentId?/"
          element={<FailedPayment />}
        />
        <Route path="/receipt/:receiptId/" element={<RegistrationReceipt />} />
        <Route path="/setting/" element={<Setting />} />
        <Route path="/articles/" element={<Articles />} />
        <Route path="/fsm/:fsmId/" element={<FSM />} />
        <Route
          path="/program/:programSlug/form/"
          element={<Registration />}
        />
        <Route
          path="/program/:programSlug/team-setting/"
          element={<TeamSetting />}
        />
        <Route path="/program/:programSlug/*" element={<Program />} />

        {/* only mentors can visit: */}
        <Route path="/program/:programSlug/manage/" element={<ProgramManagement />} />
        <Route path="/fsm/:fsmId/manage/correction/:answerId/" element={<Correction />} />
        <Route path="/fsm/:fsmId/manage/" element={<FSMManagement />} />
      </Route>

      <Route path="/" element={<AnonymousRoute />}>
        <Route path="/login/" element={<Login />} />
        <Route path="/token-expiration/" element={<Login />} />
        <Route path="/reset-password/" element={<ResetPassword />} />
        <Route path="/create-account/" element={<CreateAccount />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;