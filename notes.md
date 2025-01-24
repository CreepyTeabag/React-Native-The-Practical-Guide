## 02 - React Native Basics [COURSE GOALS APP]

### 002 Exploring Core Components & Component Styling

React Native компилирует компоненты в соответствующие нативные элементы. Например:
`<View> = <div> = android.View = UIView`
В нём нельзя использовать DOM-элементы.
Соответственно, когда мы создаём свои компоненты - мы просто создаём комбинации Основных компонентов React Native и других встроенных компонентов.
CSS не существует в React Native. Можно использовать:

- inline styles
- StyleSheet Objects
  Это всё пишется на JS. И хотя эти стили основаны на CSS, они включают в себя лишь часть существующих свойств и параметров.

### 003 Working With Core Components

Текст нельзя напрямую помещать в `<View></View>`.
`<View>` используется для того, чтобы вмещать в себя другие компоненты и размещать их каким-то образом.
`<Text>` используется для того, чтобы выводить текст.
Одна из особенностей React Native - это то, что что все основные компоненты нужно импортировать из `"react-native"`
`<Button title="smth"/>` кнопка - это самозакрывающийся тэг. Текст внутри неё прописывается в атрибуте `title`.

### 004 Styling React Native Apps

В целом, стили можно прописывать не только в `const styles = StyleSheet.create({})`, но и в обычном объекте. Но StyleSheet выдаёт нам подсказки, автозаполнение, и выводит ошибки и предупреждения.

### 008 Using Flexbox To Create Layouts

Flexbox по умолчанию применяется ко всем `<View>`, и они по умолчанию `flexDirection: "column",`

### 010 Improving The Layout

У компонента <Button/> нет пропа `style`, так что мы не можем его стилизовать. Но можно создать свою собственную кнопку.

### 011 Handling Events

Для обработки событий в React Native используются свои обработчики. Например, для `TextInput` используется `onChangeText`. Этот обработчик передаст введённое значение в предоставленную ему функцию автоматически.
`console.log()` Выведет значение в консоль, где запущен процесс `npm run start`
Для `Button` используется обработчик событий `onPress`

### 013 iOS & Android Styling Differences

Иногда одни и те же стили выглядят по-разному на разных платформах, потому что они конвертируются в разные нативные элементы. Например, на Андроиде `<Text>` может иметь скруглённые углы, а на iOS - нет. Поэтому там, где эти углы нам всё же необходимы, нужно использовать `<View>`. Другие стили также могут отличаться. это нужно перепроверять и уточнять в документации.

В отличие от обычного CSS, в React Native стилях стили не имеют каскадности и не наследуются дочерними элементами.

### 015 Optimizing Lists with FlatList

`<ScrollView>` всегда рендерит всё, что в нём есть и не очень подходит для списков, т.к. это может тормозить приложение, если дочерних элементов слишком много. Его можно использовать для чего-то вроде длинной статьи.
Для списков же лучше использовать `<FlatList>`, который будет рендерить только элементы в поле видимости и будет подгружать элементы вне экрана используя lazy-loading.
Но если в `<ScrollView>` мы просто помещаем контент ммежду открывающим и закрывающим тэгами (и используем `list.map((el) => <View>smth...</View>)`), то `<FlatList>` должен получить два пропа:

```
  <FlatList
    data={<массив данных>}
    renderItem={(itemData) => {
      return (
        <View style={styles.goalItem}>
          <Text style={styles.goalText}>{itemData.item.text}</Text> // сами данные лежат в .item
        </View>
      );
    }}
  />
```

И хотя мы открыто не прописываем проп `key`, всё-таки он нужен `FlatList`-у. Поэтому лучше всего передавать в него не просто массив данных, а массив объектов вида

```
  {
    key= 12345,
    text: 'smth'
  }

```

, откуда FlatList самостоятельно возьмёт `key`. И, соответственно, нужно брать не просто `item`, а `item.text`.

Но если по какой-то причине нам так делать неудобно, можно просто добавить к `FlatList` ещё один проп, который извлечёт `key` таким образом, которым мы ему укажем:

```
  keyExtractor={(item, index) => {
    return item.id;
  }}
```

### 019 Handling Taps with the Pressable Component

Для компонентов, на которые пользователь будет нажимать, нужно использовать компонент `Pressable`. Есть старые компоненты `Touchable`, но они уже устаревают и лучше их не использовать.

### 021 Adding an Android Ripple Effect & an iOS Alternative

На Андроиде можно добавить специальный эффект при нажатии на `Pressable`, используя проп `android_ripple`. В нём можно прописать цвет, который наложится на элемент при нажатии.
На iOS такого нет. Зато вместо этого можно использовать особые стили по условию:

```
  <Pressable
    android_ripple={{ color: "#000000" }}
    onPress={onDeleteItem}
    style={({ pressed }) => pressed && styles.pressedItem} // стиль pressedItem применится только в тот момент, когда элемент будет нажат.
  >
  </Pressable>
```

### 022 Adding a Modal Screen

Хотя добавить стили элементу `<Button/>` мы и не можем, но можно установить ей проп `color`.

### 023 Styling the Modal Overlay

Ещё стиль кнопок можно немного поменять, если обернуть их во `View` и стилизовать его. Так, например, можно повлиять на размер кнопок и внешние отступы.

### 025 Working with Images & Changing Colors

Чтобы вставлять изображения, нужно использовать компонент `<Image />`. Но путь до картинки нужно указывать не напрямую, а через испорт при помощи `require`:

```
<Image source={require("../assets/images/goal.png")} />
```

### 026 App Finishing Touches

Если нам ужно установить один и тот же фон для всего приложения, его нужно прописать в `app.json` вот так:

```
"backgroundColor": "#1e085a",
```

и тогда его не придётся прописывать для каждого экрана (но для модалок, тем не менее, указывать фон нужно).

Чтобы поменять цвет статус-бара, нужно использовать специальный компонент и указать в нём строкой нужный стиль:

```
<StatusBar style="light" /> // light / dark / inverted / auto
```

## 03 - Debugging React Native Apps (Introduction)

### 002 Handling Errors - 005 Using the React DevTools

Ways to debug a React Native App:

1. Посмотреть лог ошибок в терминале (там выводится и место возникновения ошибки, и причина).
2. Посмотреть ошибку в попапе в приложении Expo Go.
3. console.log()
4. Использовать JS debugger (в меню разработчика) (Ctrl+m чтобы открыть меню ИЛИ нажать "j" в терминале чтобы открыть debugger)
5. Использовать React DevTools, установив их глобально командой `npm install -g react-devtools`. Использовать команду `react-devtools`, а затем из developer menu в expo go зайти в JS debugger - там запустятся React DevTools.

## 04 - Diving Deeper into Components, Layouts & Styling - Building a Mini-Game App

### 003 Setting Up our Screen Components

Для создания экранов можно создать папку "screens" - это не обязательно, но удобно.

### 005 Styling for Android & iOS

Для создания тени на андроиде мы можем использовать

```
  elevation: 4,
```

Чем больше число - тем "выше" элемент и тем больше тень.
А для iOS нужно использовать набор свойств "shadow":

```
  shadowColor: "black",
  shadowOffset: { width: 0, height: 2 }, // тень сдвинута вниз на 2 пикселя
  shadowRadius: 6,
  shadowOpacity: 0.25,
```

### 006 Styling the Number Input Element

Длину вводимого значения в инпут можно ограничить при помощи `maxLength`:

```
  <TextInput maxLength={2} />
```

### 007 Configuring the TextInput Field

Для инпута можно установить тип клавиатуры, которую он будет открывать, а также много других настроек:

```
  <TextInput
    maxLength={2}
    keyboardType="number-pad"
    autoCapitalize="none"
    autoCorrect={false}
  />
```

### 011 Adding a Linear Gradient

Добавлять градиенты через стили нельзя. Для этого нужно установить специальный пакет:

```
  expo install expo-linear-gradient
```

А затем использовать компонент:

```
import { LinearGradient } from "expo-linear-gradient";

  <LinearGradient
    colors={["#4e0329", "#ddb52f"]}
  >
      something here...
  </LinearGradient>
```

### 012 Adding a Background Image

Фоновое изображение нужно добавлять через специальный компонент:

```
  <ImageBackground
    source={require("./assets/images/background.png")}
    resizeMode="cover"
    style={styles.rootScreen} // стили фонового элемента
    imageStyle={styles.backgroundImage} // стили самой картинки
  >
    <элемент, позади которого будет изображение>
  </ImageBackground>
```

### 014 Handling User Input & Showing an Alert Dialog

В React Native есть специальный объект `Alert`, у которого есть методы `.prompt()` и `.alert()`, которые позволяют показывать окошко с предупреждениями

### 017 Respecting Device Screen Restrictions with the SafeAreaView

Чтобы контент приложения не наползал на статус бар, нужно использовать компонент `SafeAreaView`. Ещё, если он не работает, можно прибегнуть к хаку со стилями и подставить в `marginTop` высоту статус бара:

```
  rootScreen: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
```

### 025 Working with Icons (Button Icons)

Expo предоставляет свою библиотеку иконок `@expo/vector-icons`, которой очень просто пользоваться. Ничего дополнительно устанавливать не нужно:

```
  import { Ionicons } from "@expo/vector-icons";
  ...
  <Ionicons name="remove" size={24} color="white" />
```

Список иконок можно найти на их сайте.

### 026 Adding & Using Custom Fonts with React Native Apps

Для работы со шрифтами лучше всего использовать библиотеку:

```
expo install expo-font
```

Также можно использовать библиотеку `expo-google-fonts` для того, чтобы совсем просто пользоваться шрифтами гугла.

Используются шрифты так (всё происходит в App.js):

```
import { useFonts } from "expo-font";


const [fontsLoaded] = useFonts({
  "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
});

if (!fontsLoaded) {
  return <AppLoading />;
}
```

Для показа индикатора загрузки можно использовать библиотеку

```
expo install expo-app-loading
```

которая и предоставит компонент `<AppLoading />`

### 028 Using & Styling Nested Text

`<Text>` может содержать в себе компонент `<Text>` , но не может содержать в себе компонент `<View>`.
`<Text>` расположенный внутри другого `<Text>` унаследует его стили.

## 05 - Building Adaptive User Interfaces (Adapt to Platform & Device Sizes)

### 003 Introducing the Dimensions API

Для адаптива можно использовать

```
import { Dimensions } from "react-native";
```

Это объект с информацией. Например, можно получить информацию про ширину экрана вот так:

```
const deviceWidth = Dimensions.get("window").width;
```

В .get можно передать "window" или "screen". На iOS разницы нет. На android screen это весь доступный экран, а window - доступный экран минус статус бар.
Полученное значение можно использовать в стилях, чтобы установить разные значения размеров элементов в зависимости от размера экрана:

```
const styles = StyleSheet.create({
  numberText: {
    fontSize: deviceWidth < 380 ? 28 : 36,
  },
});

```

### 005 Understanding Screen Orientation Problems

В файле app.json можно зафиксировать ориентацию экрана:

```
"orientation": "portrait", // или "landscape" или "default" для переключения между режимами
```

Для динамического пересчёта размеров на основании ширины/высоты при повороте экрана мы не можем просто использовать `const deviceHeight = Dimensions.get("window").height;`, потому что это значение считается только один раз и не пересчитывается при повороте экрана.

Вместо этого нужно использовать хук `import { useWindowDimensions } from "react-native";`, внутри компонента использовать его

```
const { width, height } = useWindowDimensions();

const marginTopDistance = height < 361 ? 10 : 100;
```

и применить стили к элементу `<View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>`: тогда каждый раз при смене размеров экрана значение будет пересчитываться.

### 007 Managing Screen Content with KeyboardAvoidingView

На iOS при клике на инпуте в ландшафтном режиме клавиатура перекрывает часть экрана и не закрывается. Чтобы это решить, нужно использовать следующие компоненты:

```
import {
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
...
  <ScrollView style={styles.screen}>
    <KeyboardAvoidingView style={styles.screen} behavior="position">
      <наш контент, который теперь будет сдвигаться вверх при открытии клавиатуры, его можно будет скроллить и при клике на который будет закрываться клавиатура.>
    </KeyboardAvoidingView>
  </ScrollView>
```

### 010 Writing Platform-specific Code with the Platform API

На React Native можно писать разный код для разных платформ.

```
import { Platform } from "react-native";

// .OS === android / ios /  macos / web / windows
borderWidth: Platform.OS === "android" ? 2 : 0
ИЛИ
borderWidth: Platform.select({ ios: 0, android: 2 }),
```

Также можно создавать разные файлы для разных платформ. Для этого достаточно создать два файла, например: `Title.android.js` и `Title.ios.js`, а в местах импорта использовать общее название: `import Title from "../components/ui/Title";`. React Native использует подходящий файл в зависимости от платформы. Разными могут быть файлы не только файлы компонентов, но и, например, файлы с переменными.

## 06 - React Native Navigation with React Navigation [MEALS APP]

### 004 Displaying Items in a Grid

`<FlatList>` может выводить элементы в несколько колонок. Для этого нужно добавить ему проп `numColumns={число_колонок}`

### 005 Getting Started with the React Navigation Package

Для того, чтобы добавить в приложение навигацию, нужно установить пакет:

```
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
```

Затем в App.js обернуть всё приложение в соответствующий компонент:

```
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Something />
      </NavigationContainer>
    </>
  );
}

```

Для того, чтобы начать пользоваться навигацией, нужно установить навигатор. Навигатор - это один из способов навигации (табы, выдвижной элемент и т.д.)

```
npm install @react-navigation/native-stack
```

А затем нам нужно вне компонента создать компонент навигатора и уже в приложении использовать его:

```
const Stack = createNativeStackNavigator();
...
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MealsCategories" component={CategoriesScreen} />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
```

### 006 Implementing Navigation Between Two Screens

Каждый компонент, который используется в качестве `Stack.Screen`, автоматом получает проп `navigation`
И там мы в нужном нам месте можем просто вызвать переход на нужный нам экран с указанием его имени:

```
onPress={() => navigation.navigate("MealsOverview");}
```

### 007 Setting the Default Screen

Установить экран по умолчанию можно двумя способами:

1. Просто установить экран первым в списке
2. Указать название экрана по умолчанию: `<Stack.Navigator initialRouteName="ProductDetails">`

### 008 Understanding the useNavigation Hook

Вообще есть два навигатор типа стэк: Stack и Native Stack. Но Native Stack использует нативные технологии, а Stack их просто имитирует. Так что Native Stack предпочтительнее и производительнее. Но в некоторых случаях, если с Native Stack есть какие-то проблемы, можно попробовать использовать Stack.

Проп navigation получает только экран, который будет открыт навигацией. Чтобы избежать prop drilling-а и не передавать глубоко внутрь navigation, можно использовать хук в любом компоненте:

```
import { useNavigation } from "@react-navigation/native";

...

const navigation = useNavigation();
```

### 009 Working with Route Parameters To Pass Data Between Screens

Каждый экран помимо пропа `navigation` получает ещё и проп `route`.
`route` содержит в себе информацию касательно текущего рута. В том числе, объект `params`, который мы определяем, когда прописываем навигацию: `navigate('SomeScreen', {anyKey: 'any info here!'})`

Точно так же как и с `navigation`, мы можем не только в самом экране получить `route` как проп, но и мы можем его получить из любого другого внутреннего компонента при помощи хука:

```
import { useRoute } from "@react-navigation/native";

...

const route = useRoute();
```
