<?php

namespace Acme\DemoBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('email', 'email', array('data' => 'rajasaur@gmail.com'));
        $builder->add('message', 'textarea', array('data' => 'Sample content in text area'));
    }

    public function getName()
    {
        return 'contact';
    }
}
