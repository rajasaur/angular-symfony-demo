<?php

namespace Acme\DemoBundle\EventListener;

use Symfony\Component\EventDispatcher\Event;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\HttpKernel;

class RequestListener
{

    /**
     * @var \Symfony\Component\DependencyInjection\ContainerInterface
     */
    private $router;

    public function __construct(\Symfony\Component\Routing\Router $router)
    {
        $this->router = $router;
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
        if (HttpKernel::MASTER_REQUEST === $event->getRequestType()) {
            $this->router->getContext()->setBaseUrl('');
        }
    }
}
