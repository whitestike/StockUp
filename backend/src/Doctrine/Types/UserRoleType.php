<?php
namespace App\Doctrine\Types;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;

/**
 * My custom datatype.
 */
class UserRoleType extends Type
{
    const MYTYPE = 'userrole';

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform)
    {
        return 'json';
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return array();
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform)
    {
        return '';
    }

    public function canRequireSQLConversion()
    {
        return false;
    }

    public function getName()
    {
        return self::MYTYPE; // modify to match your constant name
    }
}