<?php

class UserService
{
    private UserRepository $repository = null;

    public function loginWithUserAndPasswordAndRedirect(string $user, string $password): void
    {
        if ($this->repository->isLoginValid($user, $password)) {
            $user = $this->repository->get($user);
            $this->generateVectorForUser($user);
            $this->redirect('home');
        } else {
            $this->addFlashError('Invalid User/Password');
            $this->redirect('login');
        }
    }

    public function generateVectorForUser(User $user): void
    {
        $vector = [];

        for ($i = 0; $i < 10; $i++) {
            $vector[$i] = isset($vector[$i]) ? $vector[$i] : [];
            for ($j = 0; $j < 10; $j++) {
                $vector[$i][$j] = isset($vector[$i][$j]) ? $vector[$i][$j] : [];
                $vector[$i][$j] = $user->getVectorInfo($i, $j) + 1;
            }
        }

        $user->setVectorInfo($vector);
    }

    public function redirect()
    {
        // do nothing here
    }

    public function addFlashError()
    {
        // do nothing here
    }
}

