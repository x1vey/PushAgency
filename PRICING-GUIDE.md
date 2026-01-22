# How to Edit Pricing

All pricing information is centralized in: **`/src/config/pricing.ts`**

## Quick Guide

1. **Open the file**: `/src/config/pricing.ts`

2. **Edit the pricing plans** (`pricingPlans` array):
   - `name` - Plan name (e.g., "Starter", "Growth", "Enterprise")
   - `price` - Price text (e.g., "$107", "$150", "Let's Talk")
   - `period` - Billing period (e.g., "/month", "/year", or empty string)
   - `description` - Short description of the plan
   - `features` - Array of features with `name` and `included` (true/false)
   - `cta` - Button text (e.g., "Get Started", "Schedule a Call")
   - `popular` - Set to `true` to show "Most Popular" badge

3. **Edit the comparison table features** (`comparisonFeatures` array):
   - `name` - Feature name
   - `availability` - Array with 3 values (one for each plan: Starter, Growth, Enterprise)
     - Use `true` for a checkmark
     - Use `false` for a minus sign
     - Use a string like `"Basic"` or `"5 members"` for custom text

4. **Save the file** - Changes automatically apply to **both** the Home page and Pricing page

---

## Examples

### Changing a Price

```typescript
{
  name: 'Growth',
  price: '$199',  // Changed from $150
  period: '/month',
  // ...rest of the config
}
```

### Adding a Feature to the Card Lists

```typescript
features: [
  { name: 'Custom landing page', included: true },
  { name: 'NEW FEATURE HERE', included: true },  // Add this line
  // ...other features
]
```

### Adding a Row to the Comparison Table

```typescript
export const comparisonFeatures: ComparisonFeature[] = [
  // ...existing features
  {
    name: 'New Feature Name',
    availability: [false, true, true]  // Not in Starter, included in Growth & Enterprise
  },
];
```

### Using Custom Text in Comparison Table  

```typescript
{
  name: 'Support Level',
  availability: ['Email', 'Priority Email', 'Priority + Slack']  // Different text for each plan
}
```

---

## Where This Pricing Shows Up

✅ **Home page** - Pricing section with robot (card format)  
✅ **Pricing page** - Detailed comparison table  
✅ Any other component that imports from `/config/pricing.ts`

---

## Two Sections to Edit

### 1. `pricingPlans` - Used for:
- Home page pricing cards
- Basic plan information on Pricing page (name, price, description, CTA button)

### 2. `comparisonFeatures` - Used for:
- Pricing page comparison table rows
- Shows which features are in which plans

**Pro tip:** Edit `pricingPlans` for basic info (prices, names, CTAs). Edit `comparisonFeatures` for the detailed feature comparison grid.

---

**That's it!** No need to touch any React component files. Just edit `/src/config/pricing.ts` and you're done.
