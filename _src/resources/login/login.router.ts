import { Router } from 'express';
import User from 'resources/users/user.model';
import { createSessionToken } from 'utils/auth';
import { wrapRoute } from 'utils/wrapRoute';

import * as loginService from './login.service';

const router = Router();

router
  .route('/')
  .post(wrapRoute(async (req, res) => {
    const { login, password } = req.body;
    const auth = await loginService.tryAuthorize(login, password);

    if (typeof auth === 'string') {
      res.status(auth === 'USER_NOT_FOUND' ? 403 : 502).send();
      return;
    }

    const token = await createSessionToken({
      login: auth.login,
      userId: auth.id,
    });

    res.json({
      user: User.toResponse(auth),
      message: 'Successfully authenticated.',
      token,
    });
  }));

export default router;
