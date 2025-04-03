/**
 * ActivityFilter Component
 * 
 * A comprehensive component for filtering activities based on various criteria.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import { isFunction } from '../../utilities/typeChecks';
import { Box, Text, Button, Icon, Flex, Stack, Input, Radio, Divider } from '../../atoms';
import { SearchInput, DatePicker, Select, Accordion, Checkbox } from '../../molecules';
import {
  ACTIVITY_FILTER_CLASS,
  ACTIVITY_FILTER_HEADER_CLASS,
  ACTIVITY_FILTER_BODY_CLASS,
  ACTIVITY_FILTER_FOOTER_CLASS,
  ACTIVITY_FILTER_TITLE_CLASS,
  ACTIVITY_FILTER_SUBTITLE_CLASS,
  ACTIVITY_FILTER_ACTIONS_CLASS,
  ACTIVITY_FILTER_SECTION_CLASS,
  ACTIVITY_FILTER_SECTION_TITLE_CLASS,
  ACTIVITY_FILTER_SECTION_CONTENT_CLASS,
  ACTIVITY_FILTER_CHECKBOX_GROUP_CLASS,
  ACTIVITY_FILTER_RADIO_GROUP_CLASS,
  ACTIVITY_FILTER_RANGE_CLASS,
  ACTIVITY_FILTER_SEARCH_CLASS,
  ACTIVITY_FILTER_TAG_LIST_CLASS,
  ACTIVITY_FILTER_TAG_CLASS,
  ACTIVITY_FILTER_EMPTY_CLASS,
  ACTIVITY_FILTER_LOADING_CLASS,
  ACTIVITY_FILTER_ERROR_CLASS,
  ACTIVITY_FILTER_VARIANTS,
  ACTIVITY_FILTER_SIZES,
  ACTIVITY_FILTER_TYPES,
  ACTIVITY_FILTER_CATEGORIES,
  ACTIVITY_FILTER_MODIFIERS
} from './constants';
import './ActivityFilter.css';

/**
 * FilterSection Component
 * 
 * Renders a section of filters with a title and collapsible content.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} FilterSection component
 */
const FilterSection = ({
  title,
  children,
  collapsible = true,
  defaultExpanded = true,
  className = '',
  ...props
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    if (collapsible) {
      setExpanded(!expanded);
    }
  };

  const sectionClasses = [
    ACTIVITY_FILTER_SECTION_CLASS,
    expanded ? `${ACTIVITY_FILTER_SECTION_CLASS}--expanded` : `${ACTIVITY_FILTER_SECTION_CLASS}--collapsed`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={sectionClasses} {...props}>
      <div 
        className={ACTIVITY_FILTER_SECTION_TITLE_CLASS} 
        onClick={toggleExpanded}
        style={{ cursor: collapsible ? 'pointer' : 'default' }}
      >
        {title}
        {collapsible && (
          <Icon 
            name={expanded ? 'chevron-up' : 'chevron-down'} 
            size="sm" 
            style={{ marginLeft: 'auto' }} 
          />
        )}
      </div>
      {expanded && (
        <div className={ACTIVITY_FILTER_SECTION_CONTENT_CLASS}>
          {children}
        </div>
      )}
    </div>
  );
};

FilterSection.propTypes = {
  /** Section title */
  title: PropTypes.string.isRequired,
  /** Section content */
  children: PropTypes.node.isRequired,
  /** Whether the section is collapsible */
  collapsible: PropTypes.bool,
  /** Whether the section is expanded by default */
  defaultExpanded: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string
};

/**
 * CheckboxFilter Component
 * 
 * Renders a group of checkboxes for multi-select filtering.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} CheckboxFilter component
 */
const CheckboxFilter = ({
  options,
  selectedValues = [],
  onChange,
  className = '',
  ...props
}) => {
  const handleChange = (value, checked) => {
    if (onChange) {
      if (checked) {
        onChange([...selectedValues, value]);
      } else {
        onChange(selectedValues.filter(v => v !== value));
      }
    }
  };

  const groupClasses = [
    ACTIVITY_FILTER_CHECKBOX_GROUP_CLASS,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} {...props}>
      {options.map(option => (
        <Checkbox
          key={option.value}
          id={`checkbox-${option.value}`}
          label={option.label}
          checked={selectedValues.includes(option.value)}
          onChange={(e) => handleChange(option.value, e.target.checked)}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};

CheckboxFilter.propTypes = {
  /** Array of options */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  })).isRequired,
  /** Array of selected values */
  selectedValues: PropTypes.array,
  /** Function to handle change */
  onChange: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string
};

/**
 * RadioFilter Component
 * 
 * Renders a group of radio buttons for single-select filtering.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} RadioFilter component
 */
const RadioFilter = ({
  options,
  selectedValue,
  onChange,
  name,
  className = '',
  ...props
}) => {
  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  const groupClasses = [
    ACTIVITY_FILTER_RADIO_GROUP_CLASS,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} {...props}>
      {options.map(option => (
        <Radio
          key={option.value}
          id={`radio-${name}-${option.value}`}
          name={name}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={() => handleChange(option.value)}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};

RadioFilter.propTypes = {
  /** Array of options */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  })).isRequired,
  /** Selected value */
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Function to handle change */
  onChange: PropTypes.func,
  /** Radio group name */
  name: PropTypes.string.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string
};

/**
 * RangeFilter Component
 * 
 * Renders a range slider for filtering by a numeric range.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} RangeFilter component
 */
const RangeFilter = ({
  min = 0,
  max = 100,
  step = 1,
  value = [min, max],
  onChange,
  formatValue,
  className = '',
  ...props
}) => {
  const [rangeValues, setRangeValues] = useState(value);

  useEffect(() => {
    setRangeValues(value);
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), rangeValues[1]);
    const newValues = [newMin, rangeValues[1]];
    setRangeValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), rangeValues[0]);
    const newValues = [rangeValues[0], newMax];
    setRangeValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const formatDisplayValue = (value) => {
    return formatValue ? formatValue(value) : value;
  };

  const rangeClasses = [
    ACTIVITY_FILTER_RANGE_CLASS,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={rangeClasses} {...props}>
      <Flex justifyContent="space-between" marginBottom="sm">
        <Text variant="body2">{formatDisplayValue(rangeValues[0])}</Text>
        <Text variant="body2">{formatDisplayValue(rangeValues[1])}</Text>
      </Flex>
      <Flex gap="md">
        <Input
          type="range"
          min={min}
          max={max}
          step={step}
          value={rangeValues[0]}
          onChange={handleMinChange}
        />
        <Input
          type="range"
          min={min}
          max={max}
          step={step}
          value={rangeValues[1]}
          onChange={handleMaxChange}
        />
      </Flex>
    </div>
  );
};

RangeFilter.propTypes = {
  /** Minimum value */
  min: PropTypes.number,
  /** Maximum value */
  max: PropTypes.number,
  /** Step value */
  step: PropTypes.number,
  /** Current range values [min, max] */
  value: PropTypes.arrayOf(PropTypes.number),
  /** Function to handle change */
  onChange: PropTypes.func,
  /** Function to format display values */
  formatValue: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string
};

/**
 * DateRangeFilter Component
 * 
 * Renders date pickers for filtering by a date range.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} DateRangeFilter component
 */
const DateRangeFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = '',
  ...props
}) => {
  const handleStartDateChange = (date) => {
    if (onStartDateChange) {
      onStartDateChange(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (onEndDateChange) {
      onEndDateChange(date);
    }
  };

  return (
    <Stack spacing="sm" className={className} {...props}>
      <Box>
        <Text variant="body2" marginBottom="xs">Start Date</Text>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          maxDate={endDate}
        />
      </Box>
      <Box>
        <Text variant="body2" marginBottom="xs">End Date</Text>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          minDate={startDate}
        />
      </Box>
    </Stack>
  );
};

DateRangeFilter.propTypes = {
  /** Start date */
  startDate: PropTypes.instanceOf(Date),
  /** End date */
  endDate: PropTypes.instanceOf(Date),
  /** Function to handle start date change */
  onStartDateChange: PropTypes.func,
  /** Function to handle end date change */
  onEndDateChange: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string
};

/**
 * TagFilter Component
 * 
 * Renders a list of selectable tags for filtering.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} TagFilter component
 */
const TagFilter = ({
  tags,
  selectedTags = [],
  onChange,
  className = '',
  ...props
}) => {
  const handleTagClick = (tag) => {
    if (onChange) {
      if (selectedTags.includes(tag)) {
        onChange(selectedTags.filter(t => t !== tag));
      } else {
        onChange([...selectedTags, tag]);
      }
    }
  };

  const tagListClasses = [
    ACTIVITY_FILTER_TAG_LIST_CLASS,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={tagListClasses} {...props}>
      {tags.map(tag => (
        <div
          key={tag}
          className={ACTIVITY_FILTER_TAG_CLASS}
          onClick={() => handleTagClick(tag)}
          style={{
            backgroundColor: selectedTags.includes(tag) ? 'var(--ui-color-primary-light)' : undefined,
            cursor: 'pointer'
          }}
        >
          {tag}
          {selectedTags.includes(tag) && (
            <Icon name="check" size="xs" />
          )}
        </div>
      ))}
    </div>
  );
};

TagFilter.propTypes = {
  /** Array of available tags */
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Array of selected tags */
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  /** Function to handle change */
  onChange: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string
};

/**
 * ActivityFilter Component
 * 
 * A comprehensive component for filtering activities based on various criteria.
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} ActivityFilter component
 */
const ActivityFilter = ({
  title = 'Filters',
  subtitle,
  filters = [],
  activeFilters = {},
  onFilterChange,
  onClearFilters,
  onApplyFilters,
  loading = false,
  error = null,
  variant = ACTIVITY_FILTER_VARIANTS.DEFAULT,
  size = ACTIVITY_FILTER_SIZES.MEDIUM,
  collapsible = true,
  defaultExpanded = true,
  showClearButton = true,
  showApplyButton = true,
  clearButtonLabel = 'Clear All',
  applyButtonLabel = 'Apply Filters',
  loadingMessage = 'Loading filters...',
  errorMessage = 'Failed to load filters. Please try again later.',
  className = '',
  extensions = [],
  children,
  ...props
}) => {
  // Handle filter change
  const handleFilterChange = (filterId, value) => {
    if (onFilterChange) {
      onFilterChange(filterId, value);
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    if (onClearFilters) {
      onClearFilters();
    }
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(activeFilters);
    }
  };

  // Render filter based on type
  const renderFilter = (filter) => {
    const { id, type, label, options, ...filterProps } = filter;
    const value = activeFilters[id];

    switch (type) {
      case ACTIVITY_FILTER_TYPES.CHECKBOX:
        return (
          <CheckboxFilter
            options={options}
            selectedValues={value || []}
            onChange={(newValue) => handleFilterChange(id, newValue)}
            {...filterProps}
          />
        );
      case ACTIVITY_FILTER_TYPES.RADIO:
        return (
          <RadioFilter
            options={options}
            selectedValue={value}
            onChange={(newValue) => handleFilterChange(id, newValue)}
            name={id}
            {...filterProps}
          />
        );
      case ACTIVITY_FILTER_TYPES.RANGE:
        return (
          <RangeFilter
            value={value || [filterProps.min || 0, filterProps.max || 100]}
            onChange={(newValue) => handleFilterChange(id, newValue)}
            {...filterProps}
          />
        );
      case ACTIVITY_FILTER_TYPES.SEARCH:
        return (
          <SearchInput
            value={value || ''}
            onChange={(e) => handleFilterChange(id, e.target.value)}
            placeholder={filterProps.placeholder || `Search ${label}`}
            className={ACTIVITY_FILTER_SEARCH_CLASS}
            {...filterProps}
          />
        );
      case ACTIVITY_FILTER_TYPES.DATE:
        return (
          <DateRangeFilter
            startDate={value?.startDate}
            endDate={value?.endDate}
            onStartDateChange={(date) => handleFilterChange(id, { ...value, startDate: date })}
            onEndDateChange={(date) => handleFilterChange(id, { ...value, endDate: date })}
            {...filterProps}
          />
        );
      case ACTIVITY_FILTER_TYPES.SELECT:
        return (
          <Select
            options={options}
            value={value}
            onChange={(newValue) => handleFilterChange(id, newValue)}
            placeholder={filterProps.placeholder || `Select ${label}`}
            {...filterProps}
          />
        );
      case ACTIVITY_FILTER_TYPES.MULTI_SELECT:
        return (
          <Select
            options={options}
            value={value || []}
            onChange={(newValue) => handleFilterChange(id, newValue)}
            placeholder={filterProps.placeholder || `Select ${label}`}
            isMulti
            {...filterProps}
          />
        );
      case ACTIVITY_FILTER_TYPES.TAG:
        return (
          <TagFilter
            tags={options}
            selectedTags={value || []}
            onChange={(newValue) => handleFilterChange(id, newValue)}
            {...filterProps}
          />
        );
      default:
        return null;
    }
  };

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('ActivityFilter', {
      title,
      subtitle,
      variant,
      size,
      collapsible,
      defaultExpanded,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('ActivityFilter: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      title,
      subtitle,
      variant,
      size,
      collapsible,
      defaultExpanded,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    title: extendedTitle,
    subtitle: extendedSubtitle,
    variant: extendedVariant,
    size: extendedSize,
    collapsible: extendedCollapsible,
    defaultExpanded: extendedDefaultExpanded,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // Build activity filter state object for render props
  const activityFilterState = useMemo(() => ({
    // Data
    filters,
    activeFilters,
    
    // Configuration
    title: extendedTitle,
    subtitle: extendedSubtitle,
    variant: extendedVariant,
    size: extendedSize,
    collapsible: extendedCollapsible,
    defaultExpanded: extendedDefaultExpanded,
    
    // State
    loading,
    error,
    
    // Handlers
    handleFilterChange,
    handleClearFilters,
    handleApplyFilters,
    onFilterChange,
    onClearFilters,
    onApplyFilters,
    
    // Render helpers
    renderFilter,
    FilterSection,
    CheckboxFilter,
    RadioFilter,
    RangeFilter,
    DateRangeFilter,
    TagFilter,
    
    // Constants
    filterTypes: ACTIVITY_FILTER_TYPES,
    filterCategories: ACTIVITY_FILTER_CATEGORIES,
    
    // CSS classes
    headerClass: ACTIVITY_FILTER_HEADER_CLASS,
    bodyClass: ACTIVITY_FILTER_BODY_CLASS,
    footerClass: ACTIVITY_FILTER_FOOTER_CLASS,
    titleClass: ACTIVITY_FILTER_TITLE_CLASS,
    subtitleClass: ACTIVITY_FILTER_SUBTITLE_CLASS,
    actionsClass: ACTIVITY_FILTER_ACTIONS_CLASS,
    sectionClass: ACTIVITY_FILTER_SECTION_CLASS,
    sectionTitleClass: ACTIVITY_FILTER_SECTION_TITLE_CLASS,
    sectionContentClass: ACTIVITY_FILTER_SECTION_CONTENT_CLASS,
    checkboxGroupClass: ACTIVITY_FILTER_CHECKBOX_GROUP_CLASS,
    radioGroupClass: ACTIVITY_FILTER_RADIO_GROUP_CLASS,
    rangeClass: ACTIVITY_FILTER_RANGE_CLASS,
    searchClass: ACTIVITY_FILTER_SEARCH_CLASS,
    tagListClass: ACTIVITY_FILTER_TAG_LIST_CLASS,
    tagClass: ACTIVITY_FILTER_TAG_CLASS,
    emptyClass: ACTIVITY_FILTER_EMPTY_CLASS,
    loadingClass: ACTIVITY_FILTER_LOADING_CLASS,
    errorClass: ACTIVITY_FILTER_ERROR_CLASS
  }), [
    filters, activeFilters, extendedTitle, extendedSubtitle,
    extendedVariant, extendedSize, extendedCollapsible, extendedDefaultExpanded,
    loading, error, handleFilterChange, handleClearFilters, handleApplyFilters,
    onFilterChange, onClearFilters, onApplyFilters, renderFilter
  ]);
  
  // Determine if we're using render props
  const isRenderProps = isFunction(children);
  
  // Combine class names
  const filterClasses = [
    ACTIVITY_FILTER_CLASS,
    `${ACTIVITY_FILTER_CLASS}--${extendedVariant}`,
    `${ACTIVITY_FILTER_CLASS}--${extendedSize}`,
    loading ? `${ACTIVITY_FILTER_CLASS}--loading` : '',
    extendedClassName,
  ].filter(Boolean).join(' ');

  // Render loading state
  if (loading) {
    return (
      <div className={filterClasses} {...restProps}>
        <div className={ACTIVITY_FILTER_HEADER_CLASS}>
          <div>
            <h3 className={ACTIVITY_FILTER_TITLE_CLASS}>{extendedTitle}</h3>
            {extendedSubtitle && <p className={ACTIVITY_FILTER_SUBTITLE_CLASS}>{extendedSubtitle}</p>}
          </div>
        </div>
        <div className={ACTIVITY_FILTER_LOADING_CLASS}>
          <Icon name="loader" size="lg" />
          <Text>{loadingMessage}</Text>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={filterClasses} {...restProps}>
        <div className={ACTIVITY_FILTER_HEADER_CLASS}>
          <div>
            <h3 className={ACTIVITY_FILTER_TITLE_CLASS}>{extendedTitle}</h3>
            {extendedSubtitle && <p className={ACTIVITY_FILTER_SUBTITLE_CLASS}>{extendedSubtitle}</p>}
          </div>
        </div>
        <div className={ACTIVITY_FILTER_ERROR_CLASS}>
          <Icon name="alert-circle" size="lg" />
          <Text>{errorMessage}</Text>
          <Text variant="caption">{error.message || error}</Text>
        </div>
      </div>
    );
  }

  // If using render props, call the children function with the activity filter state
  if (isRenderProps) {
    return (
      <div className={filterClasses} {...restProps}>
        {children(activityFilterState)}
      </div>
    );
  }
  
  // Otherwise, use standard component structure
  return (
    <div className={filterClasses} {...restProps}>
      {/* Header */}
      <div className={ACTIVITY_FILTER_HEADER_CLASS}>
        <div>
          <h3 className={ACTIVITY_FILTER_TITLE_CLASS}>{extendedTitle}</h3>
          {extendedSubtitle && <p className={ACTIVITY_FILTER_SUBTITLE_CLASS}>{extendedSubtitle}</p>}
        </div>
        
        <div className={ACTIVITY_FILTER_ACTIONS_CLASS}>
          {showClearButton && (
            <Button 
              variant="text" 
              size="small" 
              onClick={handleClearFilters}
            >
              {clearButtonLabel}
            </Button>
          )}
        </div>
      </div>
      
      {/* Body */}
      <div className={ACTIVITY_FILTER_BODY_CLASS}>
        {filters.length > 0 ? (
          <Stack spacing="md">
            {filters.map(filter => (
              <FilterSection
                key={filter.id}
                title={filter.label}
                collapsible={extendedCollapsible}
                defaultExpanded={extendedDefaultExpanded}
              >
                {renderFilter(filter)}
              </FilterSection>
            ))}
          </Stack>
        ) : (
          <div className={ACTIVITY_FILTER_EMPTY_CLASS}>
            <Icon name="filter" size="lg" />
            <Text>No filters available</Text>
          </div>
        )}
      </div>
      
      {/* Footer */}
      {showApplyButton && (
        <div className={ACTIVITY_FILTER_FOOTER_CLASS}>
          <Button 
            variant="primary" 
            onClick={handleApplyFilters}
            fullWidth
          >
            {applyButtonLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

ActivityFilter.propTypes = {
  /** Children nodes or render props function */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  /** Filter panel title */
  title: PropTypes.string,
  /** Filter panel subtitle */
  subtitle: PropTypes.string,
  /** Array of filter objects */
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(ACTIVITY_FILTER_TYPES)).isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array,
    category: PropTypes.oneOf(Object.values(ACTIVITY_FILTER_CATEGORIES))
  })),
  /** Object containing active filter values */
  activeFilters: PropTypes.object,
  /** Function to handle filter change */
  onFilterChange: PropTypes.func,
  /** Function to handle clearing all filters */
  onClearFilters: PropTypes.func,
  /** Function to handle applying filters */
  onApplyFilters: PropTypes.func,
  /** Whether filters are loading */
  loading: PropTypes.bool,
  /** Error object or message */
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Component variant */
  variant: PropTypes.oneOf(Object.values(ACTIVITY_FILTER_VARIANTS)),
  /** Component size */
  size: PropTypes.oneOf(Object.values(ACTIVITY_FILTER_SIZES)),
  /** Whether filter sections are collapsible */
  collapsible: PropTypes.bool,
  /** Whether filter sections are expanded by default */
  defaultExpanded: PropTypes.bool,
  /** Whether to show the clear button */
  showClearButton: PropTypes.bool,
  /** Whether to show the apply button */
  showApplyButton: PropTypes.bool,
  /** Label for the clear button */
  clearButtonLabel: PropTypes.string,
  /** Label for the apply button */
  applyButtonLabel: PropTypes.string,
  /** Message to display when filters are loading */
  loadingMessage: PropTypes.string,
  /** Message to display when there is an error loading filters */
  errorMessage: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the component */
  extensions: PropTypes.arrayOf(PropTypes.string)
};

export default ActivityFilter;
