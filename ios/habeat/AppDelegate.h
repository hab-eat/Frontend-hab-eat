import <React/RCTBridgeDelegate.h>
import <UIKit/UIKit.h>
import <React/RCTRootView.h>
import "RNGestureHandlerModule.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
@property (nonatomic, strong) UIWindow *window;
@end
