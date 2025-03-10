/**
 * Image Component Example
 * 
 * This file demonstrates the usage of the Image component in a real-world scenario.
 */

import React from 'react';
import Box from '../atoms/Box';
import Flex from '../atoms/Flex';
import Grid from '../atoms/Grid';
import Text from '../atoms/Text';
import Image, { IMAGE_FIT, IMAGE_SHAPE, IMAGE_SIZES } from '../atoms/Image';

/**
 * ImageExample component demonstrates various use cases of the Image component
 */
const ImageExample = () => {
  // Sample image URLs
  const images = [
    {
      id: 1,
      src: 'https://source.unsplash.com/random/800x600?nature',
      alt: 'Nature image',
      title: 'Nature',
      description: 'Beautiful landscape from nature',
    },
    {
      id: 2,
      src: 'https://source.unsplash.com/random/800x600?city',
      alt: 'City image',
      title: 'Urban',
      description: 'Modern city architecture',
    },
    {
      id: 3,
      src: 'https://source.unsplash.com/random/800x600?people',
      alt: 'People image',
      title: 'People',
      description: 'Diverse group of people',
    },
    {
      id: 4,
      src: 'https://source.unsplash.com/random/800x600?technology',
      alt: 'Technology image',
      title: 'Technology',
      description: 'Modern technology devices',
    },
  ];

  // Broken image URL with fallback
  const brokenImage = {
    id: 5,
    src: 'https://this-image-does-not-exist.jpg',
    fallbackSrc: 'https://via.placeholder.com/800x600?text=Image+Not+Found',
    alt: 'Broken image with fallback',
    title: 'Fallback Example',
    description: 'This demonstrates the fallback feature',
  };

  return (
    <Box padding="24px">
      <Text as="h1" size="2xl" marginBottom="24px">
        Image Component Examples
      </Text>

      {/* Basic Image Gallery */}
      <Text as="h2" size="xl" marginBottom="16px">
        Image Gallery
      </Text>
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap="24px"
        marginBottom="48px"
      >
        {images.map((image) => (
          <Box
            key={image.id}
            padding="16px"
            borderRadius="md"
            boxShadow="md"
            backgroundColor="white"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width="100%"
              height="200px"
              fit={IMAGE_FIT.COVER}
              shape={IMAGE_SHAPE.ROUNDED}
              marginBottom="16px"
            />
            <Text as="h3" size="lg" fontWeight="bold" marginBottom="8px">
              {image.title}
            </Text>
            <Text color="gray.600">{image.description}</Text>
          </Box>
        ))}
      </Grid>

      {/* Image with Fallback */}
      <Text as="h2" size="xl" marginBottom="16px">
        Image with Fallback
      </Text>
      <Box
        padding="16px"
        borderRadius="md"
        boxShadow="md"
        backgroundColor="white"
        maxWidth="400px"
        marginBottom="48px"
      >
        <Image
          src={brokenImage.src}
          fallbackSrc={brokenImage.fallbackSrc}
          alt={brokenImage.alt}
          width="100%"
          height="250px"
          fit={IMAGE_FIT.COVER}
          shape={IMAGE_SHAPE.ROUNDED}
          marginBottom="16px"
        />
        <Text as="h3" size="lg" fontWeight="bold" marginBottom="8px">
          {brokenImage.title}
        </Text>
        <Text color="gray.600">{brokenImage.description}</Text>
      </Box>

      {/* Different Image Shapes */}
      <Text as="h2" size="xl" marginBottom="16px">
        Image Shapes
      </Text>
      <Flex gap="24px" flexWrap="wrap" marginBottom="48px">
        <Box textAlign="center">
          <Image
            src="https://source.unsplash.com/random/300x300?portrait"
            alt="Square image"
            shape={IMAGE_SHAPE.SQUARE}
            size={IMAGE_SIZES.LARGE}
            marginBottom="8px"
          />
          <Text>Square</Text>
        </Box>
        <Box textAlign="center">
          <Image
            src="https://source.unsplash.com/random/300x300?portrait"
            alt="Rounded image"
            shape={IMAGE_SHAPE.ROUNDED}
            size={IMAGE_SIZES.LARGE}
            marginBottom="8px"
          />
          <Text>Rounded</Text>
        </Box>
        <Box textAlign="center">
          <Image
            src="https://source.unsplash.com/random/300x300?portrait"
            alt="Circle image"
            shape={IMAGE_SHAPE.CIRCLE}
            size={IMAGE_SIZES.LARGE}
            marginBottom="8px"
          />
          <Text>Circle</Text>
        </Box>
      </Flex>

      {/* Responsive Image */}
      <Text as="h2" size="xl" marginBottom="16px">
        Responsive Image
      </Text>
      <Box marginBottom="48px">
        <Image
          src="https://source.unsplash.com/random/1200x600?landscape"
          alt="Responsive image"
          width="100%"
          height="auto"
          fit={{ base: 'cover', md: 'contain' }}
          shape={{ base: 'square', md: 'rounded' }}
        />
        <Text marginTop="8px" fontStyle="italic">
          This image changes its fit and shape based on screen size
        </Text>
      </Box>

      {/* Image as Background */}
      <Text as="h2" size="xl" marginBottom="16px">
        Image as Background (Polymorphic)
      </Text>
      <Image
        as="div"
        src="https://source.unsplash.com/random/1200x600?dark"
        alt="Background image"
        width="100%"
        height="300px"
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random/1200x600?dark)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          color="white"
          size="2xl"
          fontWeight="bold"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
          Text Over Image
        </Text>
      </Image>
    </Box>
  );
};

export default ImageExample;
