import React, { useState } from 'react';
import Rating from '../molecules/Rating';
import { RATING_VARIANTS } from '../molecules/Rating/constants';
import Box from '../atoms/Box';
import Card from '../molecules/Card';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Stack from '../atoms/Stack';
import Flex from '../atoms/Flex';
import Textarea from '../molecules/Textarea';

/**
 * RatingExample Component
 * 
 * Demonstrates a practical use case of the Rating component in a product review form.
 */
const RatingExample = () => {
  const [ratings, setRatings] = useState({
    overall: 0,
    quality: 0,
    value: 0,
    design: 0
  });
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleRatingChange = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log('Submitted review:', { ratings, comment });
    setSubmitted(true);
  };
  
  const handleReset = () => {
    setRatings({
      overall: 0,
      quality: 0,
      value: 0,
      design: 0
    });
    setComment('');
    setSubmitted(false);
  };
  
  // Calculate average rating
  const averageRating = Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(ratings).length;
  
  return (
    <Box maxWidth="600px" margin="0 auto">
      <Text variant="h2" marginBottom="lg">Product Review Form</Text>
      
      {submitted ? (
        <Card padding="lg">
          <Stack spacing="lg">
            <Text variant="h3">Thank you for your review!</Text>
            
            <Box>
              <Text variant="subtitle" marginBottom="sm">Your Ratings:</Text>
              <Stack spacing="md">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Overall:</Text>
                  <Rating value={ratings.overall} readOnly />
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Quality:</Text>
                  <Rating value={ratings.quality} readOnly />
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Value:</Text>
                  <Rating value={ratings.value} readOnly />
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Design:</Text>
                  <Rating value={ratings.design} readOnly />
                </Flex>
              </Stack>
            </Box>
            
            <Box>
              <Text variant="subtitle" marginBottom="sm">Your Comment:</Text>
              <Text>{comment || 'No comment provided.'}</Text>
            </Box>
            
            <Box textAlign="center">
              <Button onClick={handleReset} variant="secondary">
                Write Another Review
              </Button>
            </Box>
          </Stack>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card padding="lg">
            <Stack spacing="lg">
              <Box>
                <Text variant="subtitle" marginBottom="md">Overall Rating</Text>
                <Flex justifyContent="center">
                  <Rating 
                    value={ratings.overall} 
                    onChange={(value) => handleRatingChange('overall', value)}
                    size="large"
                    showValue
                  />
                </Flex>
              </Box>
              
              <Box>
                <Text variant="subtitle" marginBottom="md">Detailed Ratings</Text>
                <Stack spacing="md">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text>Quality:</Text>
                    <Rating 
                      value={ratings.quality} 
                      onChange={(value) => handleRatingChange('quality', value)}
                    />
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text>Value for Money:</Text>
                    <Rating 
                      value={ratings.value} 
                      onChange={(value) => handleRatingChange('value', value)}
                      variant={RATING_VARIANTS.CIRCLE}
                    />
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text>Design:</Text>
                    <Rating 
                      value={ratings.design} 
                      onChange={(value) => handleRatingChange('design', value)}
                      variant={RATING_VARIANTS.HEART}
                    />
                  </Flex>
                </Stack>
              </Box>
              
              <Box>
                <Text variant="subtitle" marginBottom="sm">Your Comments</Text>
                <Textarea
                  placeholder="Share your thoughts about this product..."
                  value={comment}
                  onChange={handleCommentChange}
                  rows={5}
                />
              </Box>
              
              <Flex justifyContent="center">
                <Button 
                  type="submit" 
                  disabled={ratings.overall === 0}
                >
                  Submit Review
                </Button>
              </Flex>
            </Stack>
          </Card>
        </form>
      )}
    </Box>
  );
};

export default RatingExample;
