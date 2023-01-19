<?php
namespace App\Tests\Service;

use PHPUnit\Framework\TestCase;
use App\Entity\Brand;
use App\Entity\Product;
use App\Entity\Tag;

class NewsletterGeneratorTest extends TestCase
{
    public function testCreateProduct()
    {
        $brand = Brand::create("Coca Cola");
        $tag = Tag::create("Drinks");
        $product = Product::create('1234789012348', 'product name', $brand, $tag);

        $this->assertEquals( 'product name', $product->name());
        $this->assertEquals( 'Coca Cola', $product->brand()->brandName());
        $this->assertEquals( 'Drinks', $product->tag()->tagName());
        $this->assertEquals( '1234789012348', $product->code());
    }
}