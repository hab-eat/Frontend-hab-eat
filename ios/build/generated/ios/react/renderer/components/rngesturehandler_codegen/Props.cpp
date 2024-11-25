
/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GeneratePropsCpp.js
 */

#include <react/renderer/components/rngesturehandler_codegen/Props.h>
#include <react/renderer/core/PropsParserContext.h>
#include <react/renderer/core/propsConversions.h>

namespace facebook::react {

RNGestureHandlerButtonProps::RNGestureHandlerButtonProps(
    const PropsParserContext &context,
    const RNGestureHandlerButtonProps &sourceProps,
    const RawProps &rawProps): ViewProps(context, sourceProps, rawProps),

    exclusive(convertRawProp(context, rawProps, "exclusive", sourceProps.exclusive, {true})),
    foreground(convertRawProp(context, rawProps, "foreground", sourceProps.foreground, {false})),
    borderless(convertRawProp(context, rawProps, "borderless", sourceProps.borderless, {false})),
    enabled(convertRawProp(context, rawProps, "enabled", sourceProps.enabled, {true})),
    rippleColor(convertRawProp(context, rawProps, "rippleColor", sourceProps.rippleColor, {})),
    rippleRadius(convertRawProp(context, rawProps, "rippleRadius", sourceProps.rippleRadius, {0})),
    touchSoundDisabled(convertRawProp(context, rawProps, "touchSoundDisabled", sourceProps.touchSoundDisabled, {false})),
    borderWidth(convertRawProp(context, rawProps, "borderWidth", sourceProps.borderWidth, {0.0})),
    borderColor(convertRawProp(context, rawProps, "borderColor", sourceProps.borderColor, {})),
    borderStyle(convertRawProp(context, rawProps, "borderStyle", sourceProps.borderStyle, {"solid"}))
      {}
RNGestureHandlerRootViewProps::RNGestureHandlerRootViewProps(
    const PropsParserContext &context,
    const RNGestureHandlerRootViewProps &sourceProps,
    const RawProps &rawProps): ViewProps(context, sourceProps, rawProps)

    
      {}

} // namespace facebook::react