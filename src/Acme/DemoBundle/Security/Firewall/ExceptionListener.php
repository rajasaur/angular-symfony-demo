<?php

namespace Acme\DemoBundle\Security\Firewall;

use Symfony\Component\Security\Http\Firewall\ExceptionListener as BaseExceptionListener;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\HttpFoundation\Response;


class ExceptionListener extends BaseExceptionListener {
    
    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $exception = $event->getException();

        // determine the actual cause for the exception
        while (null !== $previous = $exception->getPrevious()) {
            $exception = $previous;
        }

        if ($exception instanceof AuthenticationException) {
            $response = new Response();
            $response->setStatusCode(401, null);
    
            $event->setResponse($response);
        } else {
            parent::onKernelException($event);
        }
    }
}
