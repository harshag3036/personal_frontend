import React, { useState } from 'react';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Flex from '../atoms/Flex';
import Stack from '../atoms/Stack';
import Button from '../atoms/Button';
import Divider from '../atoms/Divider';
import Rating from '../molecules/Rating/Rating';
import Icon from '../atoms/Icon';
import { RATING_VARIANTS, RATING_SIZES, RATING_PRECISION } from '../molecules/Rating/constants';

/**
 * RatingRenderPropsExample
 * 
 * This example demonstrates how to use the render props pattern with the Rating component.
 */
const RatingRenderPropsExample = () => {
  const [selectedRating, setSelectedRating] = useState(3.5);
  
  return (
    <Stack spacing="xl" p={4}>
      <Box mb={4}>
        <Text variant="h2">Rating with Render Props</Text>
        <Text mb={4}>The Rating component supports render props for complete UI customization</Text>
      </Box>
      
      {/* Standard Rating Example */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Standard Rating (without render props)</Text>
        <Rating
          value={selectedRating}
          onChange={setSelectedRating}
          precision={RATING_PRECISION.HALF}
          showValue
        />
      </Box>
      
      <Divider my={4} />
      
      {/* Custom Stars Rating Example */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Custom Stars Rating with Render Props</Text>
        <Rating
          value={4}
          max={5}
          variant={RATING_VARIANTS.STAR}
        >
          {(ratingState) => (
            <Flex alignItems="center">
              {ratingState.items.map((item) => {
                const isFilled = ratingState.isFilled(item);
                const isHalf = ratingState.isHalf(item);
                
                return (
                  <Box 
                    key={item}
                    onMouseEnter={() => ratingState.setHoverValue(item)}
                    onClick={() => ratingState.setValue(item)}
                    mr={1}
                    cursor={ratingState.disabled || ratingState.readOnly ? 'default' : 'pointer'}
                    transition="transform 0.2s"
                    _hover={{ transform: 'scale(1.2)' }}
                  >
                    <svg 
                      width="36" 
                      height="36" 
                      viewBox="0 0 24 24"
                      fill={isFilled ? "#FFD700" : isHalf ? "url(#halfGradient)" : "#E2E8F0"}
                      stroke="#FFD700"
                      strokeWidth="1"
                    >
                      <defs>
                        <linearGradient id="halfGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="50%" stopColor="#FFD700" />
                          <stop offset="50%" stopColor="#E2E8F0" />
                        </linearGradient>
                      </defs>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </Box>
                );
              })}
              
              <Text ml={3} fontWeight="bold" fontSize="xl">
                {ratingState.value}/5
              </Text>
            </Flex>
          )}
        </Rating>
      </Box>
      
      <Divider my={4} />
      
      {/* Interactive Emoji Rating Example */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Interactive Emoji Rating with Render Props</Text>
        <Rating
          value={3}
          max={5}
        >
          {(ratingState) => {
            // Emojis and descriptions for each rating
            const ratingEmojis = [
              { emoji: '😡', label: 'Terrible' },
              { emoji: '😕', label: 'Poor' },
              { emoji: '😐', label: 'Average' },
              { emoji: '😊', label: 'Good' },
              { emoji: '😍', label: 'Excellent' }
            ];
            
            // Current selection (hover or actual value)
            const currentValue = ratingState.hoverValue > 0 ? ratingState.hoverValue : ratingState.value;
            const currentIndex = Math.max(0, currentValue - 1);
            
            return (
              <Box width="100%" onMouseLeave={ratingState.clearHover}>
                <Flex justifyContent="space-between" mb={4}>
                  {ratingEmojis.map((item, index) => (
                    <Box 
                      key={index}
                      textAlign="center"
                      onMouseEnter={() => ratingState.setHoverValue(index + 1)}
                      onClick={() => ratingState.setValue(index + 1)}
                      opacity={index < currentValue ? 1 : 0.5}
                      cursor="pointer"
                      transition="all 0.2s"
                      transform={index === currentIndex ? 'scale(1.5)' : 'scale(1)'}
                    >
                      <Text fontSize="3xl">{item.emoji}</Text>
                      <Text 
                        fontSize="sm" 
                        fontWeight={index === currentIndex ? 'bold' : 'normal'}
                        color={index === currentIndex ? 'blue.600' : 'gray.600'}
                      >
                        {item.label}
                      </Text>
                    </Box>
                  ))}
                </Flex>
                
                {/* Rating feedback */}
                {currentValue > 0 && (
                  <Box 
                    mt={4} 
                    p={3} 
                    borderRadius="md" 
                    bg={currentValue > 3 ? 'green.50' : currentValue > 1 ? 'yellow.50' : 'red.50'}
                    borderLeft="4px solid"
                    borderColor={currentValue > 3 ? 'green.400' : currentValue > 1 ? 'yellow.400' : 'red.400'}
                  >
                    <Text fontWeight="medium">
                      {currentValue > 3 ? 'Thank you for your positive feedback!' : 
                       currentValue > 1 ? 'Thank you for your feedback. We\'re working on improvements.' : 
                       'We\'re sorry to hear that. How can we improve?'}
                    </Text>
                    
                    {currentValue <= 3 && (
                      <Button 
                        size="sm" 
                        mt={2}
                        variant={currentValue <= 1 ? 'solid' : 'outline'}
                        colorScheme={currentValue <= 1 ? 'red' : 'yellow'}
                      >
                        Send Feedback
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            );
          }}
        </Rating>
      </Box>
      
      <Divider my={4} />
      
      {/* Interactive Product Rating Example */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Product Review Rating with Render Props</Text>
        <Box p={4} borderRadius="lg" boxShadow="md" bg="white">
          <Text fontWeight="bold" mb={3} fontSize="lg">Rate this product</Text>
          
          <Rating value={0} max={5}>
            {(ratingState) => {
              const activeValue = ratingState.hoverValue > 0 ? ratingState.hoverValue : ratingState.value;
              
              const ratingLabels = [
                'Select rating',
                'Poor',
                'Fair',
                'Good',
                'Very good',
                'Excellent'
              ];
              
              const getColor = (value) => {
                if (value === 0) return 'gray.400';
                if (value <= 2) return 'red.500';
                if (value <= 3) return 'yellow.500';
                return 'green.500';
              };
              
              return (
                <>
                  <Flex alignItems="center" mb={4}>
                    {ratingState.items.map((item) => (
                      <Box 
                        key={item}
                        onMouseEnter={() => ratingState.setHoverValue(item)}
                        onClick={() => ratingState.setValue(item)}
                        position="relative"
                        width="40px"
                        height="40px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                      >
                        <Box 
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          bottom="0"
                          borderRadius="full"
                          bg={item <= activeValue ? getColor(item) : 'gray.100'}
                          opacity={item <= activeValue ? 1 : 0.3}
                          transform={item === activeValue ? 'scale(1)' : 'scale(0.85)'}
                          transition="all 0.2s"
                        />
                        <Text 
                          position="relative" 
                          zIndex="1" 
                          fontWeight="bold" 
                          color={item <= activeValue ? 'white' : 'gray.500'}
                        >
                          {item}
                        </Text>
                      </Box>
                    ))}
                    
                    <Text ml={3} color={getColor(activeValue)} fontWeight="medium">
                      {ratingLabels[activeValue]}
                    </Text>
                  </Flex>
                  
                  {ratingState.value > 0 && (
                    <Stack spacing={3}>
                      <Box>
                        <Text fontWeight="medium" mb={1}>Title</Text>
                        <input 
                          type="text" 
                          placeholder="Summarize your experience" 
                          style={{ 
                            width: '100%', 
                            padding: '8px', 
                            border: '1px solid #CBD5E0', 
                            borderRadius: '4px' 
                          }} 
                        />
                      </Box>
                      
                      <Box>
                        <Text fontWeight="medium" mb={1}>Review</Text>
                        <textarea 
                          placeholder="Tell us what you liked or didn't like" 
                          rows={4}
                          style={{ 
                            width: '100%', 
                            padding: '8px', 
                            border: '1px solid #CBD5E0', 
                            borderRadius: '4px' 
                          }} 
                        />
                      </Box>
                      
                      <Flex justifyContent="flex-end">
                        <Button variant="solid" colorScheme="blue">
                          Submit Review
                        </Button>
                      </Flex>
                    </Stack>
                  )}
                </>
              );
            }}
          </Rating>
        </Box>
      </Box>
      
      <Divider my={4} />
      
      {/* Rating with Custom Icons */}
      <Box mb={6}>
        <Text variant="h3" mb={3}>Custom Icon Rating with Render Props</Text>
        <Rating value={2} max={5}>
          {(ratingState) => {
            // Define custom icons
            const icons = {
              active: [
                '🍪', // 1 cookie
                '🍰', // 1 cake
                '🍦', // 1 ice cream
                '🍫', // 1 chocolate
                '🧁', // 1 cupcake
              ],
              inactive: [
                '🥠', // empty cookie
                '🥧', // empty pie
                '🍶', // empty bottle
                '🍬', // candy
                '🥛', // milk
              ]
            };
            
            return (
              <Flex alignItems="center">
                <Flex onMouseLeave={ratingState.clearHover}>
                  {ratingState.items.map((item) => {
                    const isFilled = ratingState.value >= item || ratingState.hoverValue >= item;
                    
                    return (
                      <Box 
                        key={item}
                        onMouseEnter={() => ratingState.setHoverValue(item)}
                        onClick={() => ratingState.setValue(item)}
                        fontSize="3xl"
                        mx={1}
                        cursor="pointer"
                        transition="transform 0.3s"
                        _hover={{ transform: 'scale(1.3)' }}
                      >
                        {isFilled ? icons.active[item-1] : icons.inactive[item-1]}
                      </Box>
                    );
                  })}
                </Flex>
                
                <Box ml={4} p={2} bg="yellow.50" borderRadius="md">
                  <Text color="yellow.800" fontWeight="bold">
                    {ratingState.value > 0 ? `Sweetness level: ${ratingState.value}/5` : 'Rate sweetness'}
                  </Text>
                </Box>
              </Flex>
            );
          }}
        </Rating>
      </Box>
    </Stack>
  );
};

export default RatingRenderPropsExample;
