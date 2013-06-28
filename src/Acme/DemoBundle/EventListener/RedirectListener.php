<?php

namespace Acme\DemoBundle\EventListener;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Session\Flash\AutoExpireFlashBag;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\HttpKernelInterface;


class RedirectListener implements EventSubscriberInterface {
    
    public function onKernelResponse(FilterResponseEvent $event) {
        //if (HttpKernelInterface::MASTER_REQUEST !== $event->getRequestType()) {
        //    return;
        //}

        $response = $event->getResponse();
        $request = $event->getRequest();

        if ($response->isRedirect()) {
            $session = $request->getSession();
            if ($session && $session->getFlashBag() instanceof AutoExpireFlashBag) {
                // keep current flashes for one more request if using AutoExpireFlashBag
                $session->getFlashBag()->setAll($session->getFlashBag()->peekAll());
            }
            $response->setContent(json_encode(array('location' => $response->headers->get('Location'))));
            $response->setStatusCode(200);
            $response->headers->set('Content-Type', 'application/json');
            $response->headers->remove('Location');
        } 
    }

    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::RESPONSE => array('onKernelResponse', -128),
        );
    }
}
